const { defineConfig } = require("cypress");

const { removeUser } = require('./cypress/support/tasks/database')
//importa o arquivo database para ter acesso a função que foi criada
//a constante será a responsável por armazená-la dentro desse arquivo
// a retirada da função daqui foi necessária para não manter implementações complexas dentro do
//arquivo de configurações do cypress

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        removeUser
      })
    },

    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'http://localhost:3000'

  },
});
