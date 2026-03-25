# 🌿 Associação Fazenda Canábica

Site institucional e plataforma de associação da **Fazenda Canábica** — acesso seguro, responsável e humanizado à cannabis medicinal.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Monorepo | Turborepo + npm workspaces |
| Frontend | Next.js 15, React 19, Tailwind CSS 4 |
| Backend | NestJS 11, JWT Auth |
| Linguagem | TypeScript |
| Deploy | Vercel (front) + Railway (API) |

## Estrutura

```
apps/
├── web/          → Next.js (porta 3000)
└── api/          → NestJS  (porta 3001)
```

## Funcionalidades

### Site Público
- Página inicial com logo e identidade visual
- Sobre nós (missão, visão, valores)
- Como funciona (passo a passo para associação)
- Cannabis medicinal (informações e condições tratáveis)
- Serviços ao associado
- Blog / Notícias
- Fale conosco (formulário + FAQ)

### Pré-cadastro
- Formulário simplificado: nome, e-mail, telefone, endereço
- Tela de confirmação após envio
- Fluxo guiado para o associado

### Área Exclusiva do Associado
- Login com autenticação JWT
- Dashboard com status geral (perfil, documentos, assinatura)
- Upload de documentos (RG, CPF, comprovante, laudo médico, receita)
- Assinatura digital do termo de adesão
- Preparado para integração com DocuSign, Clicksign, D4Sign ou Gov.br

### API (Backend)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/associados/pre-cadastro` | Pré-cadastro de novo associado |
| POST | `/api/auth/login` | Autenticação (JWT) |
| POST | `/api/contato` | Formulário de contato |
| POST | `/api/documentos/upload` | Upload de documentos |
| POST | `/api/assinatura/iniciar` | Iniciar assinatura digital |
| POST | `/api/assinatura/webhook` | Callback do provedor de assinatura |

## Rodando localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (front + back)
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Configuração

Copie os arquivos `.env.example` para `.env` (ou `.env.local`):

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

### Variáveis do Frontend (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Variáveis do Backend (`apps/api/.env`)

```env
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=*
PORT=3001
NODE_ENV=development
```

## Deploy

### Frontend (Vercel)
- Root Directory: `apps/web`
- Framework: Next.js
- Variável: `NEXT_PUBLIC_API_URL` = URL do Railway

### Backend (Railway)
- Root Directory: `apps/api`
- Build: `npm install && npm run build`
- Start: `node dist/main.js`
- Variáveis: `JWT_SECRET`, `CORS_ORIGIN`, `PORT`, `NODE_ENV`

## Login de teste

```
Email: admin@fazendacanabica.org.br
Senha: 123456
```

## Próximos passos

- [ ] Banco de dados (Prisma + PostgreSQL)
- [ ] Integração real com provedor de assinatura digital
- [ ] Envio de e-mails transacionais (SendGrid / SES)
- [ ] Upload de arquivos para S3
- [ ] Painel administrativo
- [ ] Domínio customizado

## Licença

Privado — Associação Fazenda Canábica.
