describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.intercept('POST', '/login').as('login');   
        })

    it('go to login page', () => {
        cy.url().should('include', '/signin')
        cy.contains('Sign in').should('be.visible')
        })

    it('login with valid data', () => {
        cy.get('#username').type('wlodarqa')
        cy.get('#password').type('test')
        cy.get('[type="checkbox"]').check()
        cy.get('.MuiButton-label').click()
        cy.get('.makeStyles-root-1').should('be.visible')
        })

    it('login with invalid data', () => {
        cy.get('.makeStyles-root-1').should('be.visible') 
     })
     it('login with invalid data', () => {
        cy.get('#username').type('wrong name')
        cy.get('#password').type('wrong password')
        cy.get('[type="checkbox"]').check()
        cy.get('.MuiButton-label').click()
        cy.get('.MuiAlert-message').should('be.visible')
        })

        it('login without checkbox', () => {
            cy.get('#username').type('wlodarqa')
            cy.get('#password').type('test')
            cy.get('.MuiButton-label').click()
            cy.wait(2000)
            cy.get('.makeStyles-root-1').should('not.be.visible')
            })

    })