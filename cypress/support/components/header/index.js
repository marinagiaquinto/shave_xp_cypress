// components foi criado para agregar componentes compartilhados entre as páginas, 
// seguindo a lógica em que foi desenvolvido (de compartilhar os elementos ao invés de duplicá-lo)

class Header {

    usershouldBeLoggedIn(name){
        cy.get('.logged-user div a')
        .should('be.visible')
        .should('have.text', 'Olá, ' + name)
    }
    
}

export default new Header