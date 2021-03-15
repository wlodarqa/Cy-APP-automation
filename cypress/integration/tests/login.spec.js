describe('Login tests ', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('go to login page', () => {
        cy.url().should('include', '/signin')
        cy.contains('Sign in').should('be.visible')
    })
    it('login with valid date', () => {
        cy.get('#username').type('wlodarqa')
        cy.get('#password').type('test')
        cy.get('[type="checkbox"]').check()
        cy.intercept('POST', 'http://localhost:3001/login', {
            statusCode: 200
        })
        cy.intercept('GET', 'http://localhost:3001/bankAccounts', {
            statusCode: 200
        })
        cy.get('.MuiButton-label').click()
        
        
     })
    })