# Neon PostgreSQL — integração automática pelo painel Vercel

Este é o **único caminho aprovado** de provisionamento inicial do banco do Complexo42: integração nativa do **Vercel Marketplace / Storage**. Não criar instância manual, não copiar connection strings para o GitHub e não pedir senha de banco por mensagem.

## Estado inicial

- Projeto Vercel: [Beyond Curve / complexo42](https://vercel.com/beyond-curve/complexo42)
- Stack do app: Next.js (App Router) + React + TypeScript.
- Código e modelo proposto em `db/001_initial.sql`.
- O protótipo atual usa **dados sintéticos em memória**.
- **Ainda não existe integração de PostgreSQL conectada** nem `DATABASE_URL` no projeto. Não executar migrações.
- Fluxo de desenvolvimento da primeira versão: banco de produção **não** deve ser compartilhado com previews de PR.

## Passos no painel (sem digitar credenciais)

1. Abrir [o projeto Vercel](https://vercel.com/beyond-curve/complexo42) no workspace **Beyond Curve**.
2. Abrir **Storage** (ou a aba equivalente de Storage/Marketplace no painel atual).
3. Selecionar **Create Database** ou **Connect Store → Neon**. Alternativamente, abrir [Neon no Vercel Marketplace](https://vercel.com/marketplace/neon) e clicar em **Install**.
4. Preferir **Create New Neon Account** (integração nativa, com provisionamento e billing gerenciados pela Vercel); selecionar o **plano gratuito** e confirmar limites/condições. Não selecionar cobrança por uso, upgrade ou recurso pago sem autorização.
5. Criar o recurso pelo fluxo **Vercel → Neon**, escolher região adequada às Functions e vincular ao projeto **complexo42**.
6. Na integração, escolher os ambientes necessários. **Preview deve usar branch/banco isolado**, nunca dados de produção.
7. Verificar no painel **Settings → Environment Variables** se as variáveis foram injetadas pela integração. Verificar **apenas nomes e ambientes**; nunca copiar os valores para issues, README, chat ou logs.
8. Fazer redeploy após a ligação e validar a conexão por uma rota de saúde interna **somente após implementar o cliente de banco**.
9. Aplicar migrações versionadas apenas depois de revisar LGPD, autenticação, papéis, RLS quando aplicável, backups e rollback. **Nunca executar `db:push` automaticamente em cada build**.

## Variáveis e acesso

A variável de conexão pode se chamar `DATABASE_URL` ou ter prefixo definido pela integração. **Conferir o nome no painel**. Código deve consumir o nome configurado sem imprimir credenciais. `.env.example` é documentação, não contém segredo.

Para Next.js serverless, usar driver Neon compatível com Functions e inicialização *lazy* (não conectar ao carregar módulo durante build). Todo acesso a dados de pessoas deve ocorrer no servidor, depois da autenticação e verificação de escopo.

## Checklist de validação

- [ ] Loja/integração Neon realmente criada e conectada ao projeto.
- [ ] Plano gratuito e eventuais custos documentados; teto global de R$ 100/mês.
- [ ] Variáveis apenas no painel da Vercel; nenhum segredo no GitHub.
- [ ] Produção e Preview isolados.
- [ ] Primeiro teste com dados **sintéticos**.
- [ ] Migrações revisadas, testadas em ambiente isolado e reversíveis.
- [ ] Acesso ao banco restrito a Functions e responsáveis autorizados.
- [ ] Confirmação de política de dados e retenção antes de qualquer usuário real.

## Por que não usar `@vercel/postgres`

O antigo pacote Vercel Postgres foi substituído por integrações de armazenamento do Marketplace. A escolha aqui é **Neon PostgreSQL provido via Vercel**, evitando gerenciamento manual de credenciais ou infraestrutura externa.

## Se a integração não permitir provisionamento automático

Registrar o impedimento na [issue #11](https://github.com/Vguedess/Complexo42/issues/11) e interromper o provisionamento; **não** substituir por credenciais manuais ou banco local persistido como solução escondida. Um mantenedor com acesso ao projeto deve concluir o passo de autorização do Marketplace na interface.

**Referências oficiais:** [Vercel Storage](https://vercel.com/docs/storage) · [Vercel Marketplace](https://vercel.com/marketplace) · [Neon](https://neon.tech/docs).
