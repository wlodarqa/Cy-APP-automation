describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.intercept('POST', '/login').as('login');
        
    })

    it('go to login page', () => {
        cy.url().should('include', '/signin')
        cy.contains('Sign in').should('be.visible')
        
    })
    it('login with valid date', () => {
        cy.get('#username').type('wlodarqa')
        cy.get('#password').type('test')
        cy.get('[type="checkbox"]').check()
        cy.get('.MuiButton-label').click()
        cy.get('.makeStyles-root-1').should('be.visible').as('homepage')
        
     })
    })