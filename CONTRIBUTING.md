# Contribuindo com o Complexo42

## Fluxo de trabalho

- Abrir issue especificando problema, critérios de aceite e riscos de dados.
- Criar branch `feat/<escopo>`, `fix/<escopo>` ou `docs/<escopo>` a partir de `main`.
- Abrir Pull Request pequeno com descrição, capturas de tela (quando aplicável), testes e checklist de privacidade.
- Não enviar dados reais de alunos, usuários, screenshots de cadastros, WhatsApp, avaliações ou segredos.
- Pelo menos uma revisão por outra pessoa; alterações de autenticação, autorização e dados requerem revisão adicional.
- Não mesclar alterações de esquema sem migração versionada e plano de rollback.
- Não usar issues públicas para incidentes ou vulnerabilidades: reporte privadamente ao responsável do projeto.

## Qualidade

```bash
npm install
npm run typecheck
npm run build
```

*Segredos*: use variáveis de ambiente na Vercel. Copie `.env.example` apenas como guia e nunca commite `.env.local`.

## Definition of Done

- Funcionalidade validada com dados sintéticos.
- Autorização testada para aluno, gestor de equipe e administrador.
- Acessibilidade básica por teclado e smartphone.
- Registro de decisões, limites e tratamento de dados atualizado.
- Preview da Vercel revisado antes de liberar em produção.
