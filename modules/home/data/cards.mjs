// Dados 100% fictícios. O papel de prévia NÃO é uma credencial nem uma autorização.
export const CARD_IDS = Object.freeze(["formacao","equipes","acoes","talentos","medalhas","salas"]);
const cards = {
 aluno: {
  formacao:["MINHA FORMAÇÃO","03","trilhas demonstrativas","Seu percurso de aprendizado e as próximas etapas.","Continuar percurso",64],
  equipes:["MINHAS EQUIPES","02","equipes simuladas","Projetos coletivos e grupos dos quais você participa.","Explorar equipes",48],
  acoes:["MINHAS ENTREGAS","04","tarefas fictícias","Organize suas atividades e acompanhe validações.","Abrir Kanban",72],
  talentos:["MEU PORTFÓLIO","08","habilidades de exemplo","Reúna suas capacidades, experiências e conquistas.","Ver portfólio",81],
  medalhas:["RECONHECIMENTOS","02","medalhas ilustrativas","Entregas verificáveis ganham reconhecimento.","Ver medalhas",35],
  salas:["SALAS DE TRABALHO","03","salas demonstrativas","Espaços colaborativos por equipe e objetivo.","Explorar salas",55]
 },
 professor: {
  formacao:["TURMAS E TRILHAS","02","turmas demonstrativas","Planeje percursos e acompanhe a evolução dos alunos.","Ver turmas",64],
  equipes:["EQUIPES ORIENTADAS","03","incubadoras fictícias","Acompanhe os grupos e suas necessidades.","Ver incubadoras",48],
  acoes:["ENTREGAS EM REVISÃO","06","ações simuladas","Revise evidências e dê retorno às atividades.","Abrir Kanban",72],
  talentos:["MAPA DE TALENTOS","18","perfis ilustrativos","Identifique habilidades para formar equipes.","Explorar talentos",81],
  medalhas:["MEDALHAS PARA VALIDAR","03","exemplos pendentes","Reconheça contribuições verificadas.","Ver medalhas",35],
  salas:["SALAS ORIENTADAS","03","salas demonstrativas","Acompanhe os espaços de cada microequipe.","Explorar salas",55]
 }
};
export function demoCard(preview, id) {
 if (!CARD_IDS.includes(id)) throw new Error("Módulo inexistente");
 const safe = preview === "professor" ? "professor" : "aluno";
 const [title, number, unit, description, action, progress] = cards[safe][id];
 return { id, title, number, unit, description, action, progress, synthetic:true };
}
export async function loadCard(viewer, preview, id) {
 if (viewer.authenticated) {
  // Não expor dados privados até implementar serviços com autorização no backend.
  throw new Error("Dados autenticados ainda indisponíveis");
 }
 return demoCard(preview, id);
}
