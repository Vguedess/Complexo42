# ADR-001 — Linguagem e arquitetura modular

**Status: aceita — 09/11/2026.** Este documento é o contrato inicial entre os desenvolvedores.

## Decisões

- **TypeScript é a linguagem principal** (arquivos `.ts` e `.tsx`), com `strict: true` no `tsconfig.json`.
- JavaScript (`.js` / `.mjs`) **pode coexistir** no mesmo projeto para ferramentas, testes e integrações. O `tsconfig.json` já tem `allowJs: true`. Novos módulos de produto e APIs devem usar TypeScript; exceções devem ser justificadas em PRs.
- **Monólito modular, sem microsserviços na fase inicial**: uma aplicação Next.js, um deploy Vercel, um banco PostgreSQL via Neon integrado no painel Vercel quando aprovado.
- Cada domínio tem pastas próprias. A `app/page.tsx` só compõe as telas, controla a navegação e mantém o estado temporário compartilhado do protótipo.

## Estrutura implementada

```text
app/
  page.tsx                     # Composição das funcionalidades
  api/health/route.ts          # Diagnóstico: ainda em modo demo
modules/
  shared/navigation.ts         # Contrato de navegação entre telas
  shared/components/demo-ui.tsx
  dashboard/components/dashboard-panel.tsx
  talents/types.ts
  talents/data/demo.ts         # Fictício
  talents/components/talents-panel.tsx
  teams/types.ts
  teams/data/demo.ts           # Fictício
  teams/components/teams-panel.tsx
  actions/types.ts
  actions/workflow.ts           # Regra de domínio pura e testável
  actions/workflow.test.mjs    # Testes unitários Node.js
  actions/data/demo.ts         # Fictício
  actions/components/actions-panel.tsx
  badges/components/badges-panel.tsx
  rooms/components/rooms-panel.tsx
  evaluations/components/evaluations-panel.tsx
db/                             # Migrações propostas (não executadas)
docs/                           # Acordos técnicos e do produto
```

## Modelo de módulo quando houver backend (apenas criar quando necessário)

```text
modules/talents/
  types.ts                      # Contratos/entidades
  components/                   # React; apresentação e eventos
  domain/                       # Regras de negócio puras
  services/                     # Casos de uso e autorização no servidor
  repositories/                 # Contratos de armazenamento
  adapters/neon/                # Persistência server-only
  data/demo.ts                  # Dados sintéticos, nunca reais
```

**Fluxo de chamada:** UI → Route Handler/Server Action (autentica) → service (autoriza) → repository/adaptador Neon. Não executar SQL diretamente na UI ou nos componentes React. Recursos de um módulo devem expor interfaces explícitas para os demais módulos.

## Regras de manutenção

1. **Um módulo = uma responsabilidade.** Não criar componentes gigantes com regras de todos os domínios.
2. O módulo não deve depender dos arquivos internos de outro. Criar contratos públicos mínimos quando houver integração entre domínios.
3. `shared/` só recebe infraestrutura visual e tipos genéricos, nunca regras particulares de equipe, perfil ou medalha.
4. Funções de domínio devem ser puras quando possível e cobertas por testes. Ações que alteram dados exigirão verificação de identidade e autorização no servidor.
5. Não adicionar serviços externos (Redis, filas, IA, WebSockets) por antecipação. O limite de orçamento é **R$ 100/mês**.
6. Para dados persistentes, **provisionamento via Vercel Marketplace → Neon** (não usar configuração manual de banco). Separar preview e produção. Nada de segredos no GitHub.
7. Proteger avaliações, telefones e mensagens por privilégio mínimo; nenhum dado real antes de cumprir os controles de LGPD e autenticação.

## Fluxo dos módulos e dependências

| Módulo | Função principal | Dependências de domínio futuras |
| --- | --- | --- |
| `talents` | Perfis, habilidades e feitos | Identidade, permissões de visibilidade |
| `teams` | Incubadoras, convites e papéis | Talents, identidade |
| `actions` | Kanban, tarefas e evidências | Teams, autorização |
| `dashboard` | KPIs agregados | Services de talents/teams/actions |
| `badges` | Medalhas verificáveis | Actions, papel de emissor autorizado |
| `evaluations` | Evolução/feedback privado | Teams, auditoria, contestação |
| `rooms` | Mensagens em microequipes | Teams, retenção, moderação |

## Desenvolvimento e testes

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

### Definition of Done por módulo

- Telas e regras com tipos explícitos; sem `any` por conveniência.
- Testes básicos da lógica de domínio.
- Permissões testadas (quando houver servidor), interfaces responsivas, acessíveis.
- Atualizar README/Issue e documentação do próprio módulo.
- PR pequeno e revisão de outro mantenedor antes do merge.

**Estado atual:** todos os módulos exibem apenas **dados sintéticos**. A refatoração não habilita autenticação, banco, cadastro real nem envio de mensagens.
