//import { beforeEach } from 'mocha'
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shaver'
import login from '../support/pages/login'

describe('login', () => {


    context('quando submeto o formulário', () => {

        it('devo logar com sucesso', () => {

            const user = {
                name: "Marina",
                email: "marina123@gmail.com",
                passaword: "marina123"
            }

            loginPage.submit(user.email, user.passaword)
            shaversPage.header.usershouldBeLoggedIn(user.name)
            //pág shaver pega o header importado no construtor da pág e através dele pega a função da pasta header para executar

        })


        it('não deve logar com senha incorreta', () => {

            const user = {
                name: "Marina",
                email: "marina123@gmail.com",
                passaword: "marina12345"
            }

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.passaword)
            loginPage.noticeShouldBe(message)
        })


        it('não deve logar com email não acastrado', () => {

            const user = {
                name: "Marina",
                email: "marina12345@gmail.com",
                passaword: "marina123"
            }

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.passaword)
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

      const passaword = [
        '1',
        '12',
        '123',
        '1234',
        '12345'
      ]

      passaword.forEach((p) => {

        it(`não deve logar com a senha: ${p}`, () =>{

            loginPage.submit('marina123@gmail.com', p)
            loginPage.alertShouldBe('Pelo menos 6 caracteres')
        
        //${p} é uma interpolação de string. É preciso usar apostrofo ao invés de aspas simples!!
        //forEach realiza a iteração a partir da variação da senha 
        })

      })

      context('email no formato incorreto', () => {

        const emails = [
            'marina123gmail.com',
            'marina123@gmail',
            'marina123@',
            '@gmail.com',
        ]

        emails.forEach((e) => {

            it(`Não deve logar com email: ${e}`, () => {
                
                loginPage.submit(e, 'marina123')
                loginPage.alertShouldBe('Informe um email válido')

            })
        })

      })





    })
    




})