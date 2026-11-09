# Complexo42

> **Status: protótipo de interface e especificação técnica, não pronto para coletar dados reais.**

O **Complexo42** é uma plataforma colaborativa para mapear talentos, organizar alunos da Academia MBL, formar incubadoras, coordenar ações e acompanhar o desenvolvimento das pessoas com evidências, avaliações e reconhecimentos.

## Objetivo de produto

A proposta vai além de um CRM. O ciclo central é: **cadastro mínimo → descoberta de competências → formação de equipes → ações verificáveis → medalhas e feedback → evolução**. A comunicação por microequipe é parte do produto e pode complementar ferramentas externas.

## Situação atual

- Interface navegável e responsiva, com exemplos inteiramente fictícios.
- Quadro Kanban demonstrativo com progressão apenas em memória do navegador.
- Painel, mapa de talentos, incubadoras, reconhecimentos, salas e evolução ilustrados.
- `GET /api/health` indica explicitamente `mode: demo` e `persistentData: false`.
- **Não há login, persistência, banco de dados ou envio de mensagens habilitados.** Não inserir informações reais em exemplos/commits/issues.

## Stack e integração Vercel

- Next.js App Router, React, TypeScript, CSS.
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
npm run build
```

A implementação com banco e autenticação terá etapa própria de provisionamento. **Não execute as migrações de `db/` em produção** antes da revisão de privacidade, autorização, backups e política de exclusão.

## Organização

- `app/` – experiência demonstrativa Next.js
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
