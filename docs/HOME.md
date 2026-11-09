# Home pública do Complexo42

## Visão

Página inicial original inspirada na identidade institucional da Academia MBL: azul profundo, contraste alto, detalhes laranja e marca C42 própria, sem copiar a página oficial.

## Acesso demonstrativo

Os campos de e-mail e senha/código são **apenas placeholders desabilitados**. Eles não enviam nem armazenam informações. O login real requer integração de identidade e autorização server-side.

Os caminhos de demonstração são /?preview=aluno e /?preview=professor. A seleção é uma opção de **visualização**, não uma credencial.

## Cartões e papéis

O conjunto e a ordem de seis cartões são invariantes: formação, equipes, ações, talentos, medalhas e salas. A escolha demonstrativa altera somente conteúdo sintético (título, descrição e números de exemplo). A estrutura está no módulo home/data/cards.mjs.

## Streaming

A home é um React Server Component assíncrono no Next.js App Router. Os cartões são componentes assíncronos independentes com Suspense e skeletons, preparando o carregamento progressivo por módulo. Como as fontes atuais são objetos locais sintéticos, ainda não há ganho perceptível de tempo de streaming.

O módulo de segurança em lib/security/viewer.ts **sempre retorna visitante** até existir um provedor verificado. Não inferir papel real da URL, cookies não verificados ou variáveis do navegador.

## Testes e entrega

- npm test
- npm run typecheck
- npm run build
- Confirmar deployment READY na Vercel.
- Não acessar dados reais antes de autenticação, segregação de escopo e análise LGPD.

O laboratório anterior continua em /workspace, com dados sintéticos e sem persistência.
