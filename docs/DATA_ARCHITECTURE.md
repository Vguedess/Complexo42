# ADR-002 — Estratégia de dados e interoperabilidade

**Status:** proposta para revisão antes da primeira migração · **Data:** 2026-11-09
**Escopo:** Academia MBL, Valete e Complexo42 · **Banco inicial:** PostgreSQL/Neon, integrado exclusivamente pelo Vercel Marketplace.

## Problema

Ainda não conhecemos oficialmente a infraestrutura, o modelo de dados ou as condições de integração com os sistemas da Academia MBL e da Valete. Não devemos presumir que usam PostgreSQL, que exista uma API pública ou que teremos autorização para acessar dados de alunos.

**Objetivo arquitetural:** permitir trocar o provedor de persistência do Complexo42, importar dados autorizados e integrar sistemas terceiros sem refazer os módulos ou amarrar a identidade de uma pessoa a um sistema externo.

## Decisões

1. **Modelo canônico local.** Os domínios `members`, `skills`, `teams`, `actions`, `badges`, `evaluations` e `rooms` têm identificadores UUID próprios. Nenhuma chave primária depende do ID do Valete, da Academia MBL, do WhatsApp ou do provedor de login.
2. **Identidade desacoplada do perfil.** `members.id` identifica a pessoa internamente; `member_auth_identities` guarda mapeamento `(provider, provider_subject)` para possibilitar mudanças de provedor de autenticação sem trocar o identificador da pessoa. Identificadores de provedores não são senhas ou tokens.
3. **Referências a sistemas autorizados isoladas.** `member_external_refs` guarda apenas correspondências explícitas com IDs de terceiros, quando houver base legal, autorização e processo auditado; **não** implica acesso, importação ou sincronização automática.
4. **Dados privados separados.** WhatsApp e permissão de compartilhamento ficam em `member_contacts` e não fazem parte de consultas de diretório por padrão. Notas, mensagens e avaliações precisam de escopos separados no servidor.
5. **Feitos estruturados, não uma única string.** `member_accomplishments` permite vários registros com descrição, evidência opcional e visibilidade, sem acrescentar uma coluna a cada novo tipo de feito.
6. **PostgreSQL como implementação, não contrato do produto.** O app chama services e repositories de cada módulo, nunca executa SQL na UI. Somente o adapter de dados conhece o driver do Neon.
7. **Migrações incrementais e versionadas.** `db/001_initial.sql` é uma proposta **nunca executada** e pode ser revisada até o primeiro deploy com banco. Depois de aplicada, é imutável: toda mudança vira `002_*.sql`, `003_*.sql`, com teste e plano de rollback. Proibir migrações automáticas no build.
8. **Campos realmente variáveis.** Tags e habilidades usam tabelas de ligação; redes sociais podem usar JSONB validado. Evitar campos EAV genéricos ou guardar toda a pessoa em JSONB, pois dificulta consultas e segurança.
9. **Separar ambientes.** Branch/DB de preview não devem expor ou reutilizar produção. Dados reais não são utilizados como fixtures.
10. **Exportabilidade.** Planejar exportação estruturada (por domínio, com IDs próprios, datas, relacionamentos e regras de exclusão) para evitar lock-in no Neon; backups, restore e retenção precisam ser verificados.

## Quais dados pertencem a qual sistema?

| Dado | Fonte de verdade sugerida | Condição |
| --- | --- | --- |
| Identificação e login no Complexo42 | Provedor de identidade + ID interno local | Login por convite e autorização |
| Habilidades declaradas e feitos do Complexo42 | Complexo42 | Editáveis pelo titular; visibilidade controlada |
| Equipes, atividades, medalhas e avaliações produzidas no Complexo42 | Complexo42 | Regras de propriedade, emissão, auditoria e retenção |
| Matrícula, notas de cursos e benefícios oficiais da Academia | Sistema oficial, se disponível | Integração apenas com autorização e escopo definido |
| Assinatura/conta e dados do Valete+ | Sistema oficial, se disponível | Não replicar cadastro ou pagamentos sem necessidade |
| IDs de referência entre sistemas | Tabela de mapeamento segregada | Aprovada após confirmação e revisão jurídica |

**Regra:** a origem oficial continua proprietária de seus próprios dados. Uma sincronização autorizada é cópia ou leitura controlada, não uma segunda fonte de verdade. Definir dono de cada campo antes de integrar.

## Contrato de aplicação

```text
Next.js UI
   ↓
Route Handler / Server Action (autenticação + validação)
   ↓
Service por domínio (casos de uso e autorização)
   ↓
Repository (contrato TypeScript)
   ↓
Adapter Neon (único ponto que conhece PostgreSQL/driver)
   ↓
Neon PostgreSQL via Vercel Marketplace
```

Na prática, o adapter só deve ser extraído se surgir necessidade real. Não construir antecipadamente suporte operacional completo para MySQL, MongoDB ou Supabase.

**Integrações futuras:** conector separado (API oficial ou importação CSV expressamente autorizada) → mapeamento/normalização → validação/deduplicação → correspondências aprovadas → serviço do domínio. Não conectar o Complexo42 diretamente à base de terceiros nem compartilhar credenciais sem contrato e análise de risco.

## Plano de migração quando descobrirmos o sistema oficial

1. **Descoberta:** confirmar com responsáveis nome do sistema, APIs disponíveis, documentação, propriedade dos dados, permissões, contrato e volume.
2. **Mapeamento:** matriz de campos com `origem → destino`, obrigatoriedade, formato, deduplicação e atualização. Identificar dados sensíveis e dados que **não** serão importados.
3. **Prova de conceito sem PII:** usar amostras sintéticas e um ambiente isolado; medir custos, erros e conflitos.
4. **Consentimento/base legal e transferência:** documentar papéis de controladores/operadores, finalidades, segurança, exclusão e retenção; respeitar requisitos LGPD, inclusive o contexto político.
5. **Importação idempotente:** usar chaves externas únicas, validação, `dry-run`, relatório de conflitos e logs mínimos. Não sobrescrever perfis por heurísticas como igualdade de nome.
6. **Operação:** definir sincronização unidirecional inicial ou consulta sob demanda; armazenar `last_synced_at` apenas quando necessário. Ter reconciliação, possibilidade de desfazer e testes de regressão.

### O que evitar

- Importar ou copiar todos os dados existentes da Academia/Valete "por garantia".
- Usar WhatsApp, nome ou e-mail como chave primária.
- Tornar a tabela `members` dependente de `auth_subject` de um único provedor.
- Guardar credenciais de terceiros no código ou em Issues.
- Implementar sincronização bidirecional antes de definir a origem de verdade.
- Usar uma tabela genérica `properties` para qualquer informação; flexibilidade aparente costuma gerar dados inconsistentes.
- Alterar uma migração já aplicada em vez de publicar uma nova.
- Ativar dados reais sem política de autorização, acesso por equipe, consentimento/base legal adequada e retenção.

## Checkpoint antes da integração Neon

- [ ] Revisar `db/001_initial.sql` com outro desenvolvedor e responsável por privacidade.
- [ ] Congelar o modelo canônico mínimo da primeira release.
- [ ] Verificar os nomes de env vars da integração automática no painel, sem copiar valores.
- [ ] Planejar backup, restore e exclusão.
- [ ] Testar migrações em DB de desenvolvimento com dados fictícios; só depois habilitar ambientes reais.
- [ ] Reavaliar a necessidade de integração oficial quando houver documentação e autorização.

**Referências:** [Vercel Storage](https://vercel.com/docs/storage) · [Vercel Marketplace](https://vercel.com/marketplace) · [PostgreSQL](https://www.postgresql.org/docs/current/) · [ANPD](https://www.gov.br/anpd/pt-br).

---
**Nota:** a publicação do código é pública; os dados de matrícula, avaliações e contatos não devem ser públicos. A identificação de alunos de organização política pode revelar dados pessoais sensíveis, dependendo do contexto.
