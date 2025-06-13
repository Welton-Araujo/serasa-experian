# Blog Pessoal - API

Uma aplicação web de blog pessoal com autenticação, posts e filtros, construída com Node.js, TypeScript, Prisma e PostgreSQL.

## 📋 Requisitos

- Node.js 18+
- Docker 20+
- npm 9+
- PostgreSQL 13+

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone git@github.com:Welton-Araujo/serasa-experian.git
   cd blog-api

## 🚀 Instale as dependências
- npm install

## 🚀 Configure o ambiente
- cp .env.example .env

## 🚀 Inicie os containers
- docker-compose up -d

## 🚀 Execute as migrações
- npx prisma migrate dev

## 🚀 Inicie a aplicação
- npm run dev

## 🔧 Comandos Úteis
- Comando	Descrição
- npm run dev	Inicia em modo desenvolvimento
- npm run build	Compila o TypeScript
- npm start	Inicia em produção
- npm test	Executa todos os testes
- npm run test:unit	Testes unitários
- npm run test:int	Testes de integração
- npm run test:e2e	Testes end-to-end
- npm run prisma:gen	Gera cliente do Prisma
- npm run prisma:studio	Abre interface do banco
