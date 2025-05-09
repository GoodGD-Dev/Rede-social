# Social Messenger

Uma rede social simples de troca de mensagens, desenvolvida com Vue.js, Express, JWT e Bootstrap.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Frontend**: Aplicação Vue.js com Bootstrap para interface
- **Backend**: API REST com Express e autenticação JWT

## Requisitos

- Node.js (v14+)
- MongoDB
- NPM ou Yarn

## Instalação e Configuração

### Backend

1. Navegue até a pasta `backend`:
   ```
   cd social-messenger/backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente copiando o arquivo `.env.example` para `.env` e editando conforme necessário:
   ```
   cp .env.example .env
   ```

4. Inicie o servidor em modo de desenvolvimento:
   ```
   npm run dev
   ```

### Frontend

1. Navegue até a pasta `frontend`:
   ```
   cd social-messenger/frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm run serve
   ```

4. Para build de produção:
   ```
   npm run build
   ```

## Principais Funcionalidades

- Autenticação com JWT e cookies HTTP
- Busca e adição de contatos
- Troca de mensagens em tempo real
- Design responsivo e moderno

## Tecnologias Utilizadas

### Frontend
- Vue.js
- Vuex
- Vue Router
- Bootstrap Vue
- Axios
- SCSS

### Backend
- Express
- MongoDB (com Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt.js
- Cookie-parser
- Helmet (segurança)
- Morgan (logging)

## Estrutura de Pastas

```
social-messenger/
├── frontend/           # Aplicação Vue.js
│   ├── public/         # Arquivos estáticos
│   ├── src/
│   │   ├── assets/     # Imagens, fontes, etc.
│   │   ├── components/ # Componentes Vue
│   │   ├── views/      # Páginas da aplicação
│   │   ├── router/     # Configuração de rotas
│   │   ├── store/      # Gerenciamento de estado (Vuex)
│   │   ├── services/   # Serviços de API
│   │   ├── utils/      # Funções utilitárias
│   │   ├── App.vue     # Componente raiz
│   │   └── main.js     # Ponto de entrada
│   └── package.json
│
└── backend/            # API Express
    ├── src/
    │   ├── config/     # Configurações
    │   ├── controllers/# Controladores
    │   ├── middlewares/# Middlewares
    │   ├── models/     # Modelos de dados
    │   ├── routes/     # Rotas da API
    │   ├── services/   # Lógica de negócios
    │   ├── utils/      # Funções utilitárias
    │   └── app.js      # Configuração do Express
    ├── .env            # Variáveis de ambiente
    └── package.json
```

## Autenticação e Segurança

O sistema utiliza JWT (JSON Web Tokens) armazenados em cookies HTTP para autenticação. Todos os cookies são configurados como `httpOnly` para evitar acesso via JavaScript, e `secure` em ambiente de produção para garantir que sejam transmitidos apenas via HTTPS.

As senhas são armazenadas de forma segura utilizando hashing com bcrypt.

## Desenvolvimento Futuro

Funcionalidades planejadas para implementações futuras:

- Implementação de WebSockets para mensagens em tempo real
- Upload de imagens e arquivos
- Indicador de digitação
- Notificações push
- Status online/offline
- Grupos de conversa