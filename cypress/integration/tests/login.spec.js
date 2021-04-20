describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.url().should('include', '/signin')
        cy.title().should('eq', 'Cypress Real World App')
        cy.contains('Sign in').should('be.visible')
        cy.intercept('POST', '/login').as('apiLogin');   
    })

    it('login with invalid data', () => {
        cy.invalidLogin('wrong_username', 'wrong_password')
        cy.wait('@apiLogin').then(intercept => {
            cy.log(intercept.request.body)
        })
    })

    it('login with valid data', () => {
        cy.login('username', 'password')
        cy.get('.MuiButton-label').click()
        cy.wait('@apiLogin', ).then(intercept => {
            cy.log(intercept.request.body)
        })
        cy.get('.makeStyles-root-1').should('be.visible')
    })

    it('login with checkbox', () => {
        cy.login('username', 'password')
        cy.get('[type="checkbox"]').check()
        cy.get('.MuiButton-label').click()     
        cy.wait('@apiLogin').then(intercept => {
            cy.log(intercept)
            cy.log(intercept.request.body.remember).as('checbox')
                expect(intercept.request.body.remember).to.be.true
       })
        cy.get('.makeStyles-root-1').should('be.visible')
    })
})