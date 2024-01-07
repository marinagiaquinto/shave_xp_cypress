# Bootcamp Cypress eXperience

Este curso foi ministrado pelo Fernando Papito e tem o objetivo automatizar uma aplicação Web integrada a API e Banco de Dados.


## Instalação do projeto

1º Criar uma pasta chamada "QAx" e detro dela criar as pastas "apps" e "projects"

2º Dentro da pasta apps (aqui ficará a config para subir a aplicação de teste):

- criar a pasta “shave-xp”
  - fazer o dowload do arquivo [shavexp.zip](/home/toya/Downloads/shavexp-mvp-1.zip)
  - extrair as pastas "api" e "web" e cola-las na pasta "shave-xp" do curso
  - em “shave-xp” > "api" e “shave-xp” > "web", passar o comando “npm install” para instalar as dependências do projeto
- em "shave-xp" abrir o vs code
  - em "shave-sp" > ".env", utilizar as urls indicadas para configurar o email (create ethereal account) e o  banco de dados remoto (pricing -> tiny turtle), preenchendo as informações pedidas no arquivo
- no terminal, dentro de “shave-xp” > "api":
  - passar o comando “npm run db:init” para inicializar o banco, criando a estrutura de dados (as tabelas)
  - passar o comando “npm run db:populate” para popularmos o banco com as informações que usaremos
- subir os ambientes da API e a WEB com “npm run dev”


3º Dentro da pasta projects (aqui ficará a config do cypress e os arquivos de teste)

- clonar este repositório
  - dentro de "shave-xp-cypress", passar o comando "npm i" para instalar as dependências do projeto
  - para abrir o cypress → “npx cypress open”


  No projeto original:
    - criamos a pasta “shave-xp-cypress”
    - inicializamos o projeto com “npm init”, para instalar as dependências node e preencher o package.json
    - Instalamos o cypress → “npm install cypress@12.7.0 --save-dev”
    (--save-dev pra não ficar instalando o cypress cada vez que envia pra produção em integração contínua)

