# Gestão colaborativa no GitHub — Complexo42

Este documento define o **quadro de execução** e os critérios de entrada dos trabalhos. Não contém informações pessoais de alunos.

## Objetivos mensuráveis

1. Estruturar perfis mínimos com habilidades e entregas, sem diretório público de WhatsApp.
2. Transformar competências em **incubadoras/microequipes** com papéis e convites.
3. Acompanhar ações verificáveis pelo Kanban (a fazer → executando → revisão → concluído).
4. Conceder medalhas apenas por emissor autorizado e com evidências.
5. Oferecer avaliações privadas e possibilidade de contestação.
6. Criar salas de trabalho restritas a participantes das equipes.
7. Garantir conformidade, trilhas mínimas de auditoria e baixo custo desde o início.

## Milestones previstos

| Marco | Resultado verificável | Fase |
| --- | --- | --- |
| **M0 · Fundação segura e governança** | Termos, política de dados, auth por convite, Neon via integração Vercel, autorização testada e CI | P0 |
| **M1 · MVP: talentos, equipes e ações** | Cadastro mínimo, mapa de talentos, incubadoras, Kanban e painel agregado | P1 |
| **M2 · Reconhecimento e comunicação** | Medalhas, avaliações privadas, salas, retenção e direitos do titular | P2 |
| **M3 · Evolução futura** | Integrações e melhorias somente após validação do MVP | P3 |

Os marcos e as etiquetas são configurados por `.github/workflows/bootstrap-management.yml`. O script idempotente `.github/scripts/setup-repository.mjs` cria marcos, cria labels e classifica issues `P0`–`P3`, preservando classificações manuais anteriores. A ação tem apenas `issues:write` e `contents:read`, sem segredos externos.

- [Milestones do repositório](https://github.com/Vguedess/Complexo42/milestones)
- [Issues do produto](https://github.com/Vguedess/Complexo42/issues)
- [Ação de configuração](https://github.com/Vguedess/Complexo42/actions/workflows/bootstrap-management.yml)

Se GitHub Actions estiver desabilitado ou não tiver permissão, um mantenedor deverá habilitar a execução em **Settings → Actions** e acionar `Run workflow` (sem adicionar token pessoal). Confira a execução antes de considerar os marcos criados.

## GitHub Projects (V2): quadro colaborativo

**A criação do GitHub Projects V2 exige autorização de Projects no titular/organização.** O `GITHUB_TOKEN` de workflows não tem acesso à API de Projects; por isso o arquivo não cria projetos silenciosamente nem pede PAT no repositório.

Configuração a fazer pelo proprietário na interface GitHub:

1. Abrir o perfil **Vguedess → Projects → New project**.
2. Nome: **Complexo42 | Desenvolvimento & Incubadoras**; descrição: `Roadmap, backlog, equipes, sprints e entregas da plataforma Complexo42.`
3. Escolher visualização **Board**; vincular o repositório `Vguedess/Complexo42`.
4. Adicionar issues #1–#15 ao Project. Priorizar as que estiverem no marco **M0**.
5. Criar campos:
   - **Status:** Backlog, Ready, In progress, In review, Done, Blocked.
   - **Priority:** P0, P1, P2, P3.
   - **Area:** Produto, Frontend, Backend, Infra/Vercel, Segurança/LGPD, Governança.
   - **Sprint/Iteration:** iterações curtas, sem prazos arbitrários.
6. Criar três views: **Board** (por status), **Roadmap** (por milestone/iteration), **Table** (todas as issues, responsável e prioridade).
7. Ativar workflows nativos do Project para adicionar issues automaticamente quando abertas, se desejado.

Evitar copiar telefones e informações privadas para Issues, Projects ou comentários públicos. O GitHub Projects é quadro de **desenvolvimento de software**, não cadastro de alunos.

## Fluxo de execução

- Abrir Issue com problema, dependências e critérios de aceite.
- Marcar prioridade `P0` a `P3` e área; relacionar ao marco.
- Atribuir responsável quando houver consenso (não presumir dono).
- Trabalhar em branch `feat/<escopo>`; criar PR; revisão de outra pessoa; preview Vercel.
- Marcar Done apenas com teste concluído e documentação atualizada.
- Não colocar dados reais de estudantes em exemplos, logs, cards ou anexos.

## Sequência sugerida

**Primeiro M0**: #1, #2, #3, #4, #9, #10 e #11. Sem autenticação e revisão de privacidade, **não ativar cadastro real**.

**Depois M1**: #5, #6, #12 e #13. Publicar o primeiro fluxo funcional apenas com dados sintéticos, antes da coleta real.

**Depois M2**: #7, #8, #14 e #15. Controles de avaliação, moderação e privacidade antes de comunicação persistida.

## Decisões abertas

- Licença do código e organização mantenedora.
- Responsável jurídico pelo tratamento de dados (LGPD).
- Plataforma de autenticação, por convite.
- Limites financeiros do Neon integrado e condições do plano Hobby da Vercel.
- Responsável pela aprovação de PRs de segurança e migrações de banco.
