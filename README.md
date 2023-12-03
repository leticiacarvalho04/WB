# 🌐 WB - Group World Beauty

Bem-vindo ao repositório do projeto WB! Este é um sistema de gestão desenvolvido para gerenciar um grupo que possui um modelo de negócio focado em pequenas unidades espalhadas por várias cidades no país. O projeto foi desenvolvido em várias iterações.

## 📝 Descrição do Projeto

O WB é um sistema abrangente projetado para ajudar o Grupo World Beauty na organização e gerenciamento de suas pequenas unidades espalhadas pelas várias cidades no país. Ele abrange desde o gerenciamento dos produtos e serviços prestados até o gerenciamento destes e do cliente.

## 💻 Como Executar

Certifique-se de ter o ambiente de desenvolvimento configurado corretamente. Siga os passos abaixo para executar o projeto:

### Back-end

```bash
# Entrar na pasta do back
cd /back

# Instalar as dependências
npm install

# Iniciando o prisma
npx prisma migrate dev --name init

# Após a inicialização do prisma é necessário abrir o Mysql Workbench e executar os sqls de insert
# Caminho para a pasta com os inserts: /back/src/db

# Executando o back-end
npm run dev
```

### Front-end

```bash
# Entrar na pasta do front
cd /front

# Instale as dependências
npm install

# Executando o front-end
npm start
