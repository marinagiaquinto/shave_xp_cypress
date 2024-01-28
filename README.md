# Bootcamp Cypress eXperience

Este curso foi ministrado pelo Fernando Papito e tem o objetivo automatizar uma aplicação Web integrada a API e Banco de Dados.


## Instalação do projeto

1º Criar uma pasta chamada "QAx" e detro dela criar as pastas "apps" e "projects"

2º Dentro da pasta apps (aqui ficará a config para subir a aplicação de teste):

- criar a pasta “shave-xp”
  - fazer o dowload do arquivo [shavexp.zip](/instalacao_project/shavexp-mvp-1.zip)
  - extrair as pastas "api" e "web" e cola-las na pasta "shave-xp" do curso
  - em “shave-xp” > "api" e “shave-xp” > "web", passar o comando “npm install” para instalar as dependências do projeto
- em "shave-xp" abrir o vs code
  - em "shave-sp" > ".env", utilizar as urls indicadas para configurar o email (create ethereal account) e o  banco de dados remoto (pricing > tiny turtle), preenchendo as informações pedidas no arquivo
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

## Fixture

Existem 3 formas possíveis de usar as fixtures (massa de teste externalizada) em cypress:

Vamos considerar que existe um arquivo de teste criado com o nome "users-login.json" e nele existe o seguinte json:

{  
    "name": "Marina",  
    "email": "marina123@gmail.com",  
    "passaword": "marina123"  
}  

1° Utilizando o "cy.fixture":

![img](/midia/cyFixture.png)

Utilizando a função "fixture" do cypress.
O cypress vai ler o arquivo e então vai guardar ele dentro do objeto "data".
Sendo o then uma função de callback, as etapas seguintes devem vir dentro dele.

2° Utilizando o "import" do Javascript, o qual entendi o Json como objeto nativo.

![img](/midia/importJavaScript.png)

3° Utilizando o "This" do cypress, como objeto de contexto. Para que todos os "its" tenham acesso a ela, pode ser passada dentro do beforeEach.

![img](/midia/this.png)

Lê o arquivo de fixture, guarda ele dentro do objeto "data" e depois vai pra dentro do objeto de contexto (também chamado data mas não precisam ter nomes iguais).
Atenção: aqui é necessário utilizar a "function(){ }" ao invés da a arrow functions "() =>{ }", pois o Javascript não consegue lerr a função "This" com arrow function.

## Autonomia entre os testes

Na automação é fundamental manter a autonomia entre os testes. Isso significa que o teste não pode ser realizado pressupondo a existência de um dado e/ou condição no ambiente. 
É necessário que em cada teste criado se crie no contexto todos os pré-requisitos para sua realização, incluindo a criação de dados. Não menos importante, após o teste realizado, também é funcamental a exclusão dos dados a fim de manter o ambiente limpo e, assim, evitar erros por falta de controle de dados (ex: dados cadastrais, informações de listas, etc...)

1 - Utilizar o **cy.request** para manipular as requisições criando/deletando dados sem precisar da interface.

2 - Manipular os dados direto no **banco de dados**, caso não seja possível ou interessante utilizar as APIs.

  Para isso, no nosso caso que estamos usando o postgress:

  - no terminal, dentro da pasta que está executando o cypress (aqui, a pasta shave-xp-cypress) instalar o pacote pg através do comando "npm install pg --save-dev" [Documentação pg-pool](https://www.npmjs.com/package/pg-pool)
  - verificar no package.json se o pacote foi instalado com sucesso
  - no cypress.config.js
    - importar a classe Pool do pacote instalado: const {Pool} = require ('pg')
    - criar uma const para armazenar os dados de acesso ao banco de dados:
      
      ex:  
  
      const dbConfig = {  
        host: '',  
        user: '',  
        password: '',  
        database: '',  
        port:5432  
    }  

    - cypress.config.js > setupNodeEvents > implementar as tasks para realizar as ações necessárias no banco de dados.

    Ex:

    ![img](/midia/pgPool.png)

    Aqui, "on" serve para ouvir uma ação. Essa ação, será gerada por uma task - uma tarefa customizada em cypress - executada através da função removeUser() que possui como ação de excluir um usuário direto no banco (possível através do acesso criado no banco de dados com o pg-pool).
    Feito isso, com "function(error, result)" foi adicionada uma função de callback para apresentar respostas ou mensagem de erro caso a ação não seja realizada com sucesso.
    "throw error" faz com que o cypress aborte a ação e apresente o erro que aconteceu na etapa do teste.

    **ATENÇÃO: Promessa**

    Todas as funções cypress já possuem promessa imbutida. Isso quer dizer que mesmo sem vermos ela possui uma condição de aguardar a execução da função anterior para que a seguinte seja iniciada. Step by step.
    NO entanto, como a função de ação no banco de dados não foi feita através do Cypress, é necessário incluir a promessa para garantir que nenhuma outra função que venha após ela, seja realizada em conjunto. 

    ex:   

    return new Promise(function (resolve) {  
      ...  
      resolve({ success: ... })  
    })  

    ![img](/midia/promise.png)

    - dentro do arquivo de teste aonde quer realizar a ação no banco de dados, chamar a função através do cy.task('')

    ex:  
  
    cy.task('removeUser', user.email)  
                .then(function(result){  
                    cy.log(result)  
                })  


  
