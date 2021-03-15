describe('Login tests ', () => {
    beforeEach(() => {
        cy.visit('/')
        
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