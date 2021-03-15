describe('Login tests ', () => {
    beforeEach(() => {
        cy.visit('/')
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
    })

    it('go to login page', () => {
        cy.url().should('include', '/signin')
        cy.contains('Sign in').should('be.visible')
        cy.intercept('POST', '/login').as('login');
    })
    it('login with valid date', () => {
        cy.get('#username').type('wlodarqa')
        cy.get('#password').type('test')
        cy.get('[type="checkbox"]').check()
        cy.get('.MuiButton-label').click()
        
     })
    })