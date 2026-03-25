# 🌿 Associação Fazenda Canábica

Site institucional e plataforma de associação da Fazenda Canábica — acesso seguro, responsável e humanizado à cannabis medicinal.

## Stack

- **Monorepo**: Turborepo + npm workspaces
- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: NestJS 11, JWT Auth
- **Linguagem**: TypeScript

## Estrutura

```
apps/
├── web/          → Next.js (porta 3000)
└── api/          → NestJS  (porta 3001)
```

## Funcionalidades

### Site Público
- Página inicial com apresentação da associação
- Sobre nós (missão, visão, valores)
- Como funciona (passo a passo)
- Cannabis medicinal (informações e condições tratáveis)
- Serviços ao associado
- Blog / Notícias
- Fale conosco (formulário + FAQ)

### Pré-cadastro
- Formulário simplificado: nome, e-mail, telefone, endereço
- Confirmação visual após envio

### Área Exclusiva do Associado
- Login com autenticação JWT
- Dashboard com status geral
- Upload de documentos (RG, CPF, comprovante, laudo médico, receita)
- Assinatura digital do termo de adesão (preparado para integração com DocuSign, Clicksign, D4Sign ou Gov.br)

### API (Backend)
- `POST /api/associados/pre-cadastro` — pré-cadastro
- `POST /api/auth/login` — autenticação
- `POST /api/contato` — formulário de contato
- `POST /api/documentos/upload` — upload de documentos
- `POST /api/assinatura/iniciar` — iniciar assinatura digital
- `POST /api/assinatura/webhook` — callback do provedor de assinatura

## Rodando localmente

```bash
npm install
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:3001

## Login de teste

```
Email: admin@fazendacanabica.org.br
Senha: 123456
```

## Variáveis de ambiente

```env
# Frontend (apps/web/.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend (apps/api/.env)
JWT_SECRET=sua-chave-secreta
```

## Próximos passos

- [ ] Banco de dados (Prisma + PostgreSQL)
- [ ] Integração real com provedor de assinatura digital
- [ ] Envio de e-mails (SendGrid / SES)
- [ ] Upload de arquivos para S3
- [ ] Painel administrativo
- [ ] Deploy (Vercel + Railway / AWS)

## Licença

Privado — Associação Fazenda Canábica.
