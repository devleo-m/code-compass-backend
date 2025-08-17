# Code Compass Backend

API REST para a plataforma educacional Code Compass. Este projeto substitui o sistema de LocalStorage do frontend por uma solução robusta, escalável e segura com autenticação real, persistência de dados e analytics avançados.

## 🚀 Tecnologias

- **Runtime**: Node.js 22.16 (LTS)
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **ORM**: Sequelize com PostgreSQL
- **Cache**: Redis
- **Autenticação**: JWT + bcrypt
- **Validação**: Zod
- **Linting/Formatting**: Biome
- **Testes**: Jest + Supertest
- **Logs**: Winston + Morgan

## 📋 Pré-requisitos

- Node.js >= 22.16.0
- npm >= 10.0.0
- Docker e Docker Compose (opcional, para banco de dados)

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/devleo-m/code-compass-backend.git
cd code-compass-backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Inicie os serviços com Docker (PostgreSQL + Redis)**
```bash
npm run docker:up
```

5. **Execute as migrações do banco de dados**
```bash
npm run db:migrate
npm run db:seed
```

## 🏃‍♂️ Executando

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Testes
```bash
npm test
npm run test:watch
npm run test:coverage
```

### Linting e Formatação
```bash
npm run lint
npm run lint:fix
npm run format
```

## 📊 Health Check

Após iniciar o servidor, você pode verificar o status da aplicação:

- **Health básico**: `GET http://localhost:3000/health`
- **Health detalhado**: `GET http://localhost:3000/health/detailed`
- **Readiness**: `GET http://localhost:3000/health/ready`
- **Liveness**: `GET http://localhost:3000/health/live`

## 🗄️ Banco de Dados

### Comandos úteis
```bash
# Subir containers
npm run docker:up

# Parar containers  
npm run docker:down

# Executar migrações
npm run db:migrate

# Executar seeds
npm run db:seed

# Reset completo do banco
npm run db:reset
```

### Acesso aos bancos (desenvolvimento)
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **PgAdmin**: http://localhost:8080 (admin@codecompass.com / admin123)
- **Redis Commander**: http://localhost:8081

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **Domain Driven Design (DDD)**:

```
src/
├── domain/           # Entidades de domínio e regras de negócio
├── application/      # Casos de uso e serviços de aplicação
├── infrastructure/   # Implementações de infraestrutura
├── interfaces/       # Controllers e rotas HTTP
├── shared/          # Código compartilhado
├── config/          # Configurações da aplicação
├── middleware/      # Middlewares do Express
├── types/           # Definições de tipos TypeScript
└── tests/           # Configurações de teste
```

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor em modo desenvolvimento |
| `npm run build` | Compila TypeScript para JavaScript |
| `npm start` | Inicia servidor de produção |
| `npm test` | Executa todos os testes |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run test:coverage` | Executa testes com relatório de cobertura |
| `npm run lint` | Verifica código com Biome |
| `npm run lint:fix` | Corrige problemas de linting automaticamente |
| `npm run format` | Formata código com Biome |
| `npm run docker:up` | Sobe containers Docker |
| `npm run docker:down` | Para containers Docker |
| `npm run db:migrate` | Executa migrações do banco |
| `npm run db:seed` | Executa seeds do banco |
| `npm run db:reset` | Reset completo do banco |

## 🔧 Configuração

As configurações são gerenciadas através de variáveis de ambiente. Veja o arquivo `.env.example` para todas as opções disponíveis.

### Principais variáveis:
- `NODE_ENV`: Ambiente de execução (development/production/test)
- `PORT`: Porta do servidor (padrão: 3000)
- `DATABASE_URL`: URL de conexão com PostgreSQL
- `REDIS_URL`: URL de conexão com Redis
- `JWT_SECRET`: Chave secreta para tokens JWT

## 📚 Status do Projeto

### ✅ Concluído (Fase 1)
- [x] Setup inicial do projeto Node.js + TypeScript
- [x] Configuração Docker Compose (PostgreSQL + Redis)
- [x] Setup básico Express.js
- [x] Configuração Biome para linting
- [x] Estrutura hexagonal seguindo DDD
- [x] Configuração Sequelize + PostgreSQL
- [x] Configuração Redis para cache
- [x] Middlewares básicos (CORS, helmet, etc)
- [x] Sistema de logs com Winston
- [x] Health check endpoints
- [x] Configuração Jest para testes
- [x] Variáveis de ambiente

### 🔄 Próximas Fases
- [ ] **Fase 2**: Autenticação e Usuários (3-4 dias)
- [ ] **Fase 3**: Conteúdo Educacional (4-5 dias)
- [ ] **Fase 4**: Sistema de Quizzes (4-5 dias)
- [ ] **Fase 5**: Progresso e Gamificação (3-4 dias)
- [ ] **Fase 6**: Funcionalidades Complementares (2-3 dias)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🆘 Suporte

Se encontrar algum problema ou tiver dúvidas:

1. Verifique os logs: `npm run dev` (modo desenvolvimento tem logs detalhados)
2. Teste os health checks: `curl http://localhost:3000/health/detailed`
3. Verifique se Docker está rodando: `docker ps`
4. Consulte o arquivo `commands/guia.md` para detalhes técnicos completos

**Desenvolvido com ❤️ pela equipe Code Compass**
