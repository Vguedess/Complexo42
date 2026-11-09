# Privacidade, LGPD e segurança — requisitos antes de dados reais

**Coletar menos dados diminui riscos, mas não elimina obrigações da LGPD.** Nome, WhatsApp, redes sociais e avaliações são dados pessoais. A participação em um programa vinculado a grupo político pode revelar opinião política — dado pessoal sensível sob a LGPD — e exige análise específica da base legal, finalidade, transparência e medidas de proteção. Evitar inferência ou armazenamento de posicionamentos.

## Política de minimização

- Cidade/UF opcionais; **não** coletar GPS ou endereço.
- WhatsApp oculto por padrão; revelar somente mediante decisão informada, necessidade de trabalho e autorização.
- Links de redes sociais são opt-in; nunca importar automaticamente contatos ou perfis.
- Feitos/portfólio devem descrever entregas próprias, com evidências adequadas, sem dados de terceiros.
- Avaliações são acessíveis só ao titular e avaliadores/gestores diretamente autorizados, sem indexação pública.
- Não armazenar dados de menores sem avaliação jurídica e processo apropriado.

## Antes de abrir cadastro

1. Definir controlador, operador(es), encarregado/canal de contato quando aplicável e bases legais para cada finalidade; avaliar tratamento de dados sensíveis com assessoria jurídica.
2. Publicar aviso de privacidade e regras de uso e registrar as versões aceitas quando pertinente.
3. Documentar retenção, exclusão, retificação, exportação e resposta a titulares; rotinas de backup e remoção.
4. Implementar login seguro, convites, recuperação de conta, MFA para avaliadores/admins e revogação de acesso.
5. Verificar permissão por recurso (`member_id`, `team_id`, `room_id`, `evaluation_id`) em **toda** operação do servidor e em arquivos privados.
6. Implementar rate limiting, proteção CSRF/XSS, validação no servidor, logs sem PII, auditoria restrita e alertas de acesso indevido.
7. Revisar fornecedores, contratos de tratamento e transferências internacionais; checar regiões de armazenamento.
8. Testar com dados totalmente sintéticos, inclusive políticas de acesso horizontal (IDOR).

## Matriz básica de visibilidade

| Informação | Titular | Membro da equipe | Líder autorizado | Avaliador autorizado | Admin com necessidade |
| --- | --- | --- | --- | --- | --- |
| Nome e habilidades | Sim | Sim, no escopo | Sim, no escopo | Sim, no escopo | Sim |
| Cidade/UF opt-in | Sim | Conforme escolha | Conforme finalidade | Conforme finalidade | Conforme finalidade |
| WhatsApp | Sim | Não, por padrão | Apenas com autorização | Não, por padrão | Exceção documentada |
| Entregas e medalhas | Sim | Apenas as compartilhadas | Sim, escopo da equipe | Sim, escopo delegado | Sim, conforme função |
| Avaliação privada | Sim | Não | Conforme delegação | Se autor/escopo | Acesso excepcional auditado |
| Mensagens | Se participante | Se participante | Se participante | Não por padrão | Exceção documentada |

## Arquivos públicos

GitHub público não receberá CSV de alunos, screenshots, notas de desempenho, WhatsApp, senhas, env vars, chaves, backup SQL ou logs de produção. Nunca usar perfis reais como fixtures.

## Segurança de evolução

Critérios de avaliação devem ser claros, contextualizados, passíveis de revisão e contestação. Medalhas exigem evidência, emissor identificado e trilha de auditoria. Relatórios gerenciais devem ser agregados sempre que possível.
