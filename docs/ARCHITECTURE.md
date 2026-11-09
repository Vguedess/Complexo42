# Arquitetura e integração com Vercel

## ADR de linguagem e separação funcional

Adotamos **TypeScript como linguagem principal, com JavaScript permitido**, e arquitetura de **monólito modular**. O shell `app/page.tsx` compõe sete módulos em `modules/`, separados por domínio. Cada módulo poderá receber sua própria UI, regras, serviço, testes e adapter do Neon quando for necessário.

Consulte [ADR-001 — Módulos e convenções](MODULES.md) e [ADR-002 — Estratégia de dados e interoperabilidade](DATA_ARCHITECTURE.md).

## Topologia pretendida

```text
GitHub público (código, CI, issues, PRs)
   │ push / pull request
   ▼
Vercel Project: complexo42 (Next.js / React / TypeScript)
   ├─ UI: perfis, equipes, ações, medalhas, salas
   ├─ API/Server Actions: validação + autorização de toda operação
   ├─ Provedor de identidade: convites, sessões, MFA para gestores
   └─ PostgreSQL (Neon via Vercel Marketplace)
       ├─ identidade e perfis
       ├─ equipes e tarefas
       ├─ reconhecimentos e avaliações privadas
       └─ mensagens, auditoria e retenção
```

## Escolhas técnicas

- **Um só projeto Next.js**, sem microservices iniciais. API por Route Handlers; sem filas, AI ou cache dedicado na primeira fase.
- **Neon/PostgreSQL** via Marketplace; migrações SQL revisadas; pool/driver serverless. Não provisionado neste scaffold. **Banco e sistema oficial Valete/Academia desconhecidos**: apenas conectores aprovados, sem acoplamento ao modelo local.
- **Auth por convite** com provedor consolidado; o sistema resolve `(provider, provider_subject)` em `members.id` usando `member_auth_identities`. Os módulos dependem do ID interno, não do provedor de login. A autorização não confia em papéis vindos de formulários do cliente.
- **Acesso a avaliações, WhatsApp e mensagens** somente com checks por objeto e por vínculo à equipe; sempre no servidor, com política de menor privilégio.
- **Medalhas**: emissor, escopo delegado, entrega, justificativa e histórico de revogação. Não são votos populares.
- **Comunicação**: salas e mensagens com controle de participação, moderação e retenção; considerar integração com Discord/Matrix no futuro em vez de implementar streaming/WebSockets prematuramente.
- **Uploads**: não previstos no MVP; se necessários, usar Vercel Blob privado com verificação de conteúdo/tamanho/autorização.

## Ordem de implantação

1. Confirmar licença, governança dos dados e termos do plano Vercel.
2. Conectar o GitHub ao projeto Vercel.
3. Selecionar e provisionar PostgreSQL em **Storage → Create Database / Vercel Marketplace**; não inserir credenciais no repositório.
4. Configurar provedor de login, redirects, env vars e identidade de preview.
5. Completar `getDb()` lazy, migrações, testes e modelos de domínio (o SQL em `db/` é só proposta).
6. Implementar endpoints e UI com autorizações por papel e objeto.
7. Executar revisão de segurança e LGPD antes de aceitar dados reais.

## Custos

- Priorizar recursos sem custo para prototipação, mas **validar os limites atuais** e eventuais charges do Marketplace antes de provisionar.
- Limite de projeto informado: **R$ 100/mês**, incluindo serviços terceiros. Não ativar upgrades, SMS, notificações ou AI paga automaticamente.
- O plano Hobby tem restrições de uso pessoal/não comercial e colaboração; avaliar enquadramento e custo de Pro antes do lançamento. Um plano Pro pode consumir grande parte ou ultrapassar o orçamento após câmbio, impostos e usuários adicionais.
- Preferir emails de convite ao invés de SMS pago; WhatsApp apenas como contato opcional e não como API na primeira fase.

## Revisões e produção

- Pull Request → Vercel Preview → revisão funcional, visual, segurança e custos → merge na main → deploy.
- Deploys de preview não devem acessar dados de produção.
- Não executar `db:push` no build nem migrar banco automaticamente com credenciais de produção em PRs.
- Backups e plano de restauração devem estar testados antes de dados reais.
