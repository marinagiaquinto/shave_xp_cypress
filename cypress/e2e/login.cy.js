import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shaver'
import data from '../fixtures/users-login.json'
//ao invés de usar o cy.fixture, usou o import do javascript para obter a massa

describe('login', () => {


    context('quando submeto o formulário', () => {

        it('devo logar com sucesso', () => {
            const user = data.success

            cy.task('removeUser', user.email)
                .then(function(result){
                    cy.log(result)
                })

            cy.request({
                method: 'POST',
                url: 'http://localhost:3333/users',
                body: user
            }).then(function(response){
                expect(response.status).to.eq(201)
            })

            loginPage.submit(user.email, user.password)
            shaversPage.header.usershouldBeLoggedIn(user.name)
           //pág shaver pega o header importado no construtor da pág e através dele pega a função da pasta header para executar
        })


        it('não deve logar com senha incorreta', () => {

            const user = data.invpass

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)
        })


        it('não deve logar com email não acastrado', () => {

            const user = data.email404

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)
            loginPage.noticeShouldBe(message)
        })


        it('Campos obrigatórios', () => {

            loginPage.submit()

            cy.get('.alert-error')
                .should('have.length', 2)
                .and($small => {
                    expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
                    expect($small.get(1).textContent).to.equal('Senha é obrigatória')
                })
                //o $ serve pra deixar explícito que ele está buscando um elemento HTML
                // length garante que tem 2 desses elementos na lista, visto que o localizador de ambos é igual
                //ATENÇÃO: dentro do it, se uma validação falha ele não segue pra segunda validação !!!!
                //porém, se passar, quer dizer que ambas passaram


        })

    })

    context('senha muito curta', () => {

      data.shortpass.forEach((p) => {

        it(`não deve logar com a senha: ${p}`, () =>{

            loginPage.submit('marina123@gmail.com', p)
            loginPage.alertShouldBe('Pelo menos 6 caracteres')
        
        //${p} é uma interpolação de string. É preciso usar apostrofo ao invés de aspas simples!!
        //forEach realiza a iteração a partir da variação da senha 
        })

      })

      context('email no formato incorreto', () => {

        data.invemails.forEach((e) => {

            it(`Não deve logar com email: ${e}`, () => {
                
                loginPage.submit(e, 'marina123')
                loginPage.alertShouldBe('Informe um email válido')

            })
        })

      })





    })
    




})