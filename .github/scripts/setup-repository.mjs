/**
 * Bootstrap idempotente do planejamento de produto do Complexo42.
 * Executado pelo GitHub Actions com permissao issues:write.
 * Nunca utiliza tokens pessoais, dados dos alunos ou credenciais de terceiros.
 */
const repository = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
if (!repository || !token) throw new Error("GitHub Actions context missing");
const base = "https://api.github.com/repos/" + repository;
async function api(path, method = "GET", body) {
  const response = await fetch(base + path, {
    method,
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 600);
    throw new Error(method + " " + path + " => " + response.status + " " + detail);
  }
  return response.status === 204 ? null : response.json();
}

const milestones = [
  { title: "M0 · Fundação segura e governança", description: "Acordos de contribuição, LGPD, acesso por convite, banco Neon integrado via Vercel e testes de segurança." },
  { title: "M1 · MVP: talentos, equipes e ações", description: "Cadastro mínimo opt-in, busca de competências, incubadoras, quadro Kanban e métricas operacionais." },
  { title: "M2 · Reconhecimento e comunicação", description: "Medalhas, avaliações privadas, salas por equipe e direitos dos titulares." },
  { title: "M3 · Evolução futura", description: "Integrações opcionais, relatórios agregados e melhorias após validação do MVP." },
];
const labels = [
  { name: "prioridade:P0", color: "b42318", description: "Fundação e segurança; bloqueia dados reais" },
  { name: "prioridade:P1", color: "e48c18", description: "MVP essencial" },
  { name: "prioridade:P2", color: "2869bb", description: "Evolução após MVP" },
  { name: "prioridade:P3", color: "667085", description: "Melhoria futura" },
  { name: "area:governanca", color: "8250df", description: "Governança e colaboração" },
  { name: "area:seguranca", color: "ad3d29", description: "Autenticação, autorização e LGPD" },
  { name: "area:infra", color: "1f883d", description: "Vercel, Neon e CI/CD" },
  { name: "area:produto", color: "218b9b", description: "Funcionalidades e UX" },
  { name: "area:backend", color: "0969da", description: "APIs e banco de dados" },
  { name: "area:frontend", color: "c87319", description: "Next.js, UI e acessibilidade" },
  { name: "type:feature", color: "a2eeef", description: "Funcionalidade do produto" },
  { name: "type:chore", color: "e4e7eb", description: "Infraestrutura/documentação" },
  { name: "status:blocked", color: "d93f0b", description: "Dependência externa ou revisão pendente" },
];

const existingMilestones = await api("/milestones?state=all&per_page=100");
const phaseNumbers = {};
for (const [index, definition] of milestones.entries()) {
  const found = existingMilestones.find((m) => m.title === definition.title);
  const created = found ?? await api("/milestones", "POST", { ...definition, state: "open" });
  phaseNumbers["P" + index] = created.number;
  console.log("Milestone: " + created.title + " (#" + created.number + ")");
}
const currentLabels = await api("/labels?per_page=100");
for (const definition of labels) {
  if (!currentLabels.some((l) => l.name === definition.name)) {
    await api("/labels", "POST", definition);
    console.log("Label: " + definition.name);
  }
}
// Apenas issues abertas, nunca PRs. Não substituir alterações manuais já existentes.
const issues = await api("/issues?state=open&per_page=100");
const specialAreas = {
  1: ["area:governanca", "type:chore"],
  2: ["area:seguranca", "area:backend", "type:feature"],
  3: ["area:infra", "area:backend", "type:chore"],
  4: ["area:seguranca", "area:governanca", "type:chore"],
  5: ["area:produto", "area:frontend", "type:feature"],
  6: ["area:produto", "area:backend", "type:feature"],
  7: ["area:produto", "area:backend", "type:feature"],
  8: ["area:produto", "type:feature"],
};
for (const issue of issues) {
  if (issue.pull_request) continue;
  const phase = /^P([0-3])\s*[·:—-]/.exec(issue.title)?.[0]?.slice(0, 2);
  if (!phase) continue;
  if (!issue.milestone) {
    await api("/issues/" + issue.number, "PATCH", { milestone: phaseNumbers[phase] });
  }
  const targetLabels = [
    "prioridade:" + phase,
    ...(specialAreas[issue.number] || ["area:produto", "type:feature"]),
  ];
  const existing = new Set(issue.labels.map((l) => l.name));
  const missing = targetLabels.filter((l) => !existing.has(l));
  if (missing.length) {
    await api("/issues/" + issue.number + "/labels", "POST", { labels: missing });
  }
  console.log("Issue #" + issue.number + " -> " + phase);
}
console.log("Planejamento inicial sincronizado. Nenhum dado pessoal utilizado.");
