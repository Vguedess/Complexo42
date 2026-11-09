# ADR-001 — JavaScript e monólito modular

**Decisão atualizada em 09/11/2026.**

## Linguagens

- **JavaScript** é o padrão para app, APIs, UI, domínio e testes: extensões .js, .jsx e .mjs.
- **TypeScript** fica reservado para segurança: verificação de identidade, sessões e autorização. Arquivo inicial: lib/security/viewer.ts.
- next-env.d.ts e tsconfig.json existem para suporte ao Next.js e às fronteiras de segurança, não para obrigar TypeScript no produto.

## Estrutura

- app/page.jsx — home pública, renderização de Server Components.
- app/home.css — identidade visual isolada por classes prefixadas.
- app/layout.jsx — metadados e layout global.
- app/workspace/page.jsx — laboratório demonstrativo anterior.
- app/api/health/route.js — status sem dados pessoais.
- lib/security/viewer.ts — retorno sempre visitante até integrar login verificado.
- modules/home/data/cards.mjs — seis cartões com conteúdo fictício por papel.
- modules/home/components/cards.jsx — cartões independentes e Suspense para streaming.
- modules/home/components/access.jsx — placeholders de login desativados.
- modules/shared — navegação e componentes comuns em JavaScript.
- modules/dashboard, talents, teams, actions, badges, rooms e evaluations — módulos de demonstração convertidos para JavaScript.
- db/001_initial.sql — modelo proposto, ainda não aplicado.

## Contratos

1. Um módulo responde por um domínio; a UI nunca acessa diretamente credenciais ou banco.
2. Os mesmos seis cartões ocupam as mesmas posições para aluno e professor. A prévia só muda conteúdo sintético; nunca autentica.
3. A futura autenticação deve resolver o papel no servidor e autorizar acesso por recurso, turma e equipe antes de carregar dados pessoais.
4. IDs internos estáveis e integração opcional com Valete/Academia seguem [ADR-002](DATA_ARCHITECTURE.md).
5. A implementação real com Neon deve usar integração automática da Vercel, sem segredos no GitHub.
6. Testes, build, responsividade e acessibilidade antes do merge.

Consulte [Home e streaming](HOME.md) e [Contribuindo](../CONTRIBUTING.md).
