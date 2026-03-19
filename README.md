# Berdnaski NestJS Boilerplate 🚀

Um boilerplate **Premium**, intuitivo e escalável para aplicações NestJS, construído com as melhores práticas que utilizo no meu dia a dia como desenvolvedor. Focado em performance, arquitetura limpa e produtividade.

---

## 🤵 Sobre o Autor
Este projeto foi desenvolvido por **Erick Berdnaski**. Se este boilerplate te ajudou e você deseja retribuir, estou aceitando contribuições para o meu **casamento**! ❤️

- **LinkedIn**: [Erick Berdnaski](https://www.linkedin.com/in/erick-berdnaski/)
- **PIX para contribuição**: `(34) 9 97677943`  
<br />
<img src="https://github.com/user-attachments/assets/fd039913-0f03-460e-9727-ade8b4ebfe4f" width="200" alt="PIX QR Code" />

---

## 🛠️ Tecnologias & Features

- **NestJS**: Framework Node.js robusto.
- **Prisma ORM**: Manipulação de banco de dados com tipagem total.
- **PostgreSQL**: Banco de dados relacional (Docker Ready).
- **Redis & BullMQ**: Gerenciamento de filas profissional com separação por prioridade (`CORE` e `LONG_RUNNING`).
- **BullBoard Dashboard**: Visualização das filas em tempo real em `/admin/queues`.
- **Cloudflare R2 / S3**: Serviço de Storage para uploads de arquivos desacoplado.
- **JWT Auth**: Sistema de Login com Access e Refresh Tokens.
- **Hexagonal / Clean Architecture**: Estrutura baseada em `UseCases`, `Domain` e `Infra`.
- **Global Exception Filter**: Tratamento de erros padronizado em inglês.
- **Swagger UI**: Documentação interativa da API em `/api`.

---

## 🏗️ Estrutura do Projeto

```text
src/
  modules/          # Módulos de domínio (Auth, Users, etc)
    auth/           # Lógica de autenticação e tokens
    users/          # Gestão de usuários e perfis
  shared/           # Recursos compartilhados
    database/       # Configuração Prisma
    infrastructure/ # Filas, Storage e serviços externos
    security/       # Hasher de senhas e JWT
    exceptions/     # Filtros e exceções customizadas
```

---

## 🚀 Como começar

### 1. Pré-requisitos
- Node.js (v18+)
- Docker e Docker Compose
- pnpm (recomendado) ou npm

### 2. Instalação
```bash
# Clone o repositório
git clone https://github.com/berdnaski/berdnaski-nest-boilerplate.git

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
```

### 3. Suba a infraestrutura e o banco
```bash
# Sobe PostgreSQL e Redis
docker-compose up -d

# Rode as migrations do Prisma
npx prisma migrate dev
```

### 4. Inicie a aplicação
```bash
# Desenvolvimento
pnpm run start:dev
```

---

## ⚙️ Variáveis de Ambiente Necessárias
Não esqueça de configurar seu arquivo `.env` com:
- `DATABASE_URL`
- `REDIS_HOST`, `REDIS_PORT`
- `JWT_SECRET`
- `CLOUDFLARE_R2_ACCESS_KEY`, `CLOUDFLARE_R2_SECRET_KEY`

---

## 📄 Licença
Este projeto é livre para uso pessoal e comercial. Se for legal para você, considere deixar uma ⭐ no repositório!
