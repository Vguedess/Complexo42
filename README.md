# Complexo42

> **Status: protótipo de interface e especificação técnica, não pronto para coletar dados reais.**

O **Complexo42** é uma plataforma colaborativa para mapear talentos, organizar alunos da Academia MBL, formar incubadoras, coordenar ações e acompanhar o desenvolvimento das pessoas com evidências, avaliações e reconhecimentos.

## Links do projeto

- Demonstração publicada: https://complexo42-beyond-curve.vercel.app
- Backlog colaborativo: https://github.com/Vguedess/Complexo42/issues
- Deploys: https://vercel.com/beyond-curve/complexo42

A demonstração utiliza **somente dados sintéticos**, sem autenticação ou armazenamento de dados pessoais. A navegação e o Kanban são ilustrativos, sem persistência.

## Organização do trabalho no GitHub

A execução é orientada por **Issues, Milestones e GitHub Projects**. O painel de desenvolvimento deve acompanhar a evolução do código (e não registrar dados de alunos).

| Marco | Resultado esperado |
| --- | --- |
| **M0** · Fundação segura e governança | LGPD, autenticação, autorização, CI e banco Neon provisionado via Vercel |
| **M1** · MVP operacional | Cadastro mínimo, mapa de talentos, incubadoras, Kanban e indicadores |
| **M2** · Reconhecimento e comunicação | Medalhas, avaliações privadas, salas, retenção e direitos dos titulares |
| **M3** · Evolução futura | Relatórios, integrações opcionais e melhorias do produto |

- [Issues priorizadas e atribuição de responsáveis](https://github.com/Vguedess/Complexo42/issues)
- [Milestones / entregas por fase](https://github.com/Vguedess/Complexo42/milestones)
- [Planejamento e criação do GitHub Projects](docs/GITHUB_GESTAO.md)
- [Guia de integração **automática** do Neon pela Vercel](docs/VERCEL_NEON_AUTOMATICO.md)
- [Roadmap detalhado](docs/ROADMAP.md)

O workflow [Planejamento GitHub](.github/workflows/bootstrap-management.yml) cria e associa marcos e etiquetas quando executado com permissão `issues:write`. A criação do **Projects V2** exige permissão adicional e está documentada para o proprietário concluir na interface.

## Objetivo de produto

A proposta vai além de um CRM. O ciclo central é: **cadastro mínimo → descoberta de competências → formação de equipes → ações verificáveis → medalhas e feedback → evolução**. A comunicação por microequipe é parte do produto e pode complementar ferramentas externas.

## Situação atual

- Interface navegável e responsiva, com exemplos inteiramente fictícios.
- Quadro Kanban demonstrativo com progressão apenas em memória do navegador.
- Painel, mapa de talentos, incubadoras, reconhecimentos, salas e evolução ilustrados.
- `GET /api/health` indica explicitamente `mode: demo` e `persistentData: false`.
- **Não há login, persistência, banco de dados ou envio de mensagens habilitados.** Não inserir informações reais em exemplos/commits/issues.

## Home, linguagem e streaming

- **JavaScript como linguagem principal**: páginas e componentes JSX, domínio e utilitários em módulos ES. **TypeScript reservado à segurança**, inicialmente no verificador de sessão.
- **Home pública em /:** Server Components e Suspense por cartão, com interface inspirada na Academia MBL e marca Complexo42.
- **Seis cartões fixos** que mudam o conteúdo sintético entre /?preview=aluno e /?preview=professor.
- **Portal de acesso desativado:** campos de e-mail e código são apenas placeholders. A prévia não concede permissões.
- **Laboratório anterior:** /workspace, preservando os sete módulos simulados e o Kanban temporário.
- Documentação: [Home e streaming](docs/HOME.md) e [Arquitetura modular](docs/MODULES.md).

## Stack e integração Vercel

- Next.js App Router, React, JavaScript, CSS e TypeScript somente na fronteira de segurança.
- Vercel para builds, deploys de preview e produção e Functions; preferência por região `gru1` se o banco for regionalmente compatível.
- Banco **PostgreSQL via Neon no Vercel Marketplace**, quando habilitado, com migrações SQL versionadas em `db/`.
- Autenticação via provedor consolidado (Clerk / Better Auth com configuração segura) antes de qualquer cadastro.
- Redis via Upstash **apenas se necessário** para limite de taxa, filas ou cache; não na primeira entrega.
- Vercel Blob **privado** caso uploads venham a ser aprovados. Não armazenar dados de alunos em blobs públicos.
- Vercel Flags / Global Config apenas para configurações, não dados de pessoas.

**Evitar** `@vercel/postgres` e `@vercel/kv`, pacotes descontinuados; preferir integrações atuais do Marketplace.

## Executar localmente (apenas demonstração)

Requisitos: Node.js 22+.

```bash
npm install
npm run dev
# http://localhost:3000
```

```bash
npm run typecheck
npm test
npm run build
```

A implementação com banco e autenticação terá etapa própria de provisionamento. **Não execute as migrações de `db/` em produção** antes da revisão de privacidade, autorização, backups e política de exclusão.

## Organização

- `app/` – composição Next.js e rotas HTTP
- `modules/` – funcionalidades separadas em módulos com componentes, contratos e regras
- `docs/MODULES.md` – convenções de TypeScript/JavaScript e limites entre módulos
- `db/001_initial.sql` – modelo relacional proposto; ainda não provisionado
- `docs/PRODUCT.md` – requisitos, papéis e MVP
- `docs/ARCHITECTURE.md` – decisões técnicas e ordem de implementação
- `docs/PRIVACY_SECURITY.md` – riscos LGPD e segurança por padrão
- `docs/ROADMAP.md` – backlog em fases para o time
- `CONTRIBUTING.md` – fluxo de trabalho, PRs e padrões de contribuição

## Papel do repositório público

**O código é público, os dados não.** Nenhum telefone, avaliação, conversa, token, endereço, dump ou cadastro real deve entrar no GitHub. Informações de usuários devem residir apenas no banco privado, com autenticação e autorização validadas no backend.

## Próximos passos essenciais

1. Revisar requisitos e responsável pelo tratamento de dados.
2. Definir papéis e regras de autorização; habilitar login por convite.
3. Provisionar o PostgreSQL pela integração oficial da Vercel; aplicar migrações revisadas.
4. Implementar APIs seguras e testes de autorização por objeto/equipe.
5. Implementar módulos de cadastro, busca, times e tarefas.
6. Adicionar medalhas, avaliações privadas e salas de comunicação.
7. Revisar custos, termos de uso da Vercel e conformidade antes da produção.

## Licenciamento

Ainda **não há licença de código definida**. A publicidade do repositório não significa automaticamente permissão para reutilização. A equipe deverá escolher uma licença expressamente antes de aceitar contribuições externas.
