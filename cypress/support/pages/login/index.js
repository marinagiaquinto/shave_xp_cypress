
class LoginPage {

    constructor() {
        this.alertError = '.alert-error'
    }


//função carregada automaticamente quando ativa a classe

//criação de classe tem que ser criado com padrão Pascal Case.
//as classes são representativas das páginas que serão testadas

    submit(email = null, passaword = null) {

        cy.visit('/')
        cy.get('input[placeholder="Seu email"]').as('email')
        cy.get('input[placeholder*=senha]').as('passaword')

        if (email) {
            cy.get('@email').type(email)
        }

        if (passaword) {
            cy.get('@passaword').type(passaword)
        }
       
        cy.contains('button', 'Entrar').click()

        //vai primeiro verificar a existência dos campos
        //se tiver email e senha ele entra na condição. Se não tiver, ele vai assumir o valor nulo e vai direto pro click.

    }


    noticeShouldBe(message){
        cy.get('.notice-container')
        .should('be.visible')
        .find('.error p')
        .should('have.text', message)
        //o find procura um elemento específico dentro dos filhos do elemento que chamou no get
    }


    alertShouldBe(message){
        cy.get(this.alertError)
        cy.should('be.visible')
        cy.should('have.text', message)
    }

    requiredFields(emailMessage, passwordMessage) {
        cy.get(this.alertError)
        .should('have.length', 2)
        .and($small => {
            expect($small.get(0).textContent).to.equal(emailMessage)
            expect($small.get(1).textContent).to.equal(passwordMessage)
        })
        //o $ serve pra deixar explícito que ele está buscando um elemento HTML
        // length garante que tem 2 desses elementos na lista, visto que o localizador de ambos é igual
        //ATENÇÃO: dentro do it, se uma validação falha ele não segue pra segunda validação !!!!
        //porém, se passar, quer dizer que ambas passaram





    }




}


export default new LoginPage
//o new exporta a classe já ativada
//ou seja, o objeto que importar esta exportação já vai pegar o objeto ativado com acesso a todos os recursos da classe




