# Aplicação de Métricas de Assinantes

Este projeto é uma aplicação web full-stack desenvolvida para permitir aos usuários carregar planilhas de dados de assinantes e visualizar métricas chave de negócios, como Monthly Recurring Revenue (MRR) e Churn Rate, em gráficos interativos.

## Tecnologias Utilizadas

- **Front-End**: Vue.js 3 + Vite
- **Back-End**: NestJS
- **Visualização dos Dados**: Chart.js
- **Containerização**: Docker
- **Deploy**: Vercel (Front-End), Railway (Back-End)

## Estrutura do Projeto

O repositório está organizado da seguinte forma:

Claro! Aqui está um exemplo de README.md para o seu projeto, considerando todas as discussões e desenvolvimentos que fizemos:

markdown
Copy code

# Aplicação de Métricas de Assinantes

Este projeto é uma aplicação web full-stack desenvolvida para permitir aos usuários carregar planilhas de dados de assinantes e visualizar métricas chave de negócios, como Monthly Recurring Revenue (MRR) e Churn Rate, em gráficos interativos.

## Tecnologias Utilizadas

- **Front-End**: Vue.js 3 + Vite
- **Back-End**: NestJS
- **Banco de Dados**: (Se aplicável, mencione o banco de dados usado, ex.: PostgreSQL, MongoDB)
- **Visualização dos Dados**: Chart.js
- **Containerização**: Docker
- **Deploy**: Vercel (Front-End), Railway (Back-End)

## Estrutura do Projeto

O repositório está organizado da seguinte forma:

/
├── Frontend/
│ ├── src/
│ ├── .env.local
│ ├── .env.production
│ ├── ...
├── Backend/
│ ├── src/
│ ├── Dockerfile
│ ├── ...
├── docker-compose.yml

# Instruções de Instalação

### Front-End

1. Clone o repositório e navegue até a pasta `Frontend`.
2. Instale as dependências com `npm install`.
3. Para iniciar o servidor de desenvolvimento, execute `npm run dev`.
4. Para construir para produção, use `npm run build`.

### Back-End

1. Navegue até a pasta `Backend`.
2. Instale as dependências com `npm install`.
3. Para iniciar o aplicativo, execute `npm run start:dev`.

## Instruções de Uso

1. Acesse a interface web pelo navegador.
2. Use o componente de upload para selecionar e enviar sua planilha de dados (.xlsx).
3. Após o processamento, os gráficos interativos mostrando o MRR e Churn Rate serão exibidos.

## Deploy

- **Front-End**: Hospedado no Vercel: [https://teste-coin-base.vercel.app/](#)
- **Back-End**: Hospedado no Railway: [https://teste-coinbase-production.up.railway.app/](#)

---

Desenvolvido por [Matheus Ryuki Medeiros Kaiya](#)