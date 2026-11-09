# Roadmap técnico (proposta de issues)

## P0 — Fundação e governança

- [ ] `P0-01` Definir titularidade, licença do repositório, responsáveis e processo de revisão de código.
- [ ] `P0-02` Revisar avaliação de LGPD, risco de opinião política sensível e aviso de privacidade.
- [ ] `P0-03` Conectar GitHub→Vercel e proteger o fluxo de merge em `main`.
- [ ] `P0-04` Provisionar Neon PostgreSQL pelo Vercel Marketplace (plano gratuito verificado); configurar ambientes isolados.
- [ ] `P0-05` Implantar autenticação por convite e sessões seguras; MFA em papéis privilegiados.
- [ ] `P0-06` Implementar autorização por objeto/equipe e testes de vazamento horizontal.

## P1 — Núcleo do MVP

- [ ] `P1-01` Cadastro mínimo, edição e exclusão do próprio perfil.
- [ ] `P1-02` Tags de habilidades e busca de talentos por cidade/UF opt-in.
- [ ] `P1-03` Cadastro de equipes, convites, aceite, líderes e participação.
- [ ] `P1-04` Quadro Kanban com ações, responsáveis, critérios de aceite e revisão de entrega.
- [ ] `P1-05` Painel operacional de equipe com KPIs agregados.

## P2 — Evolução e comunicação

- [ ] `P2-01` Medalhas com emissor autorizado, evidência, revogação e histórico.
- [ ] `P2-02` Avaliações privadas com critérios, contestação e trilha de auditoria.
- [ ] `P2-03` Salas de microequipes com acesso por vínculo, moderação e retenção.
- [ ] `P2-04` Exportação/exclusão de dados e controles de privacidade do perfil.
- [ ] `P2-05` Integração opcional com comunicação externa, sem sincronizar contatos por padrão.

## P3 — Melhorias futuras (não comprometer orçamento agora)

- [ ] Busca avançada por evidência de habilidades; matching de equipes com supervisão humana.
- [ ] Relatórios de evolução longitudinal sem ranking público de indivíduos.
- [ ] Integrações com gestão de projetos e calendário.

## Critérios de aceite transversais

- Qualquer endpoint com dados pessoais exige autenticação, autorização em servidor, validação e teste de negação.
- Não registrar PII em analytics/logs; todas as features passam por revisão de acessibilidade e smartphone.
- Qualquer custo recorrente precisa caber no teto de R$100/mês e ser explicitamente aprovado.
