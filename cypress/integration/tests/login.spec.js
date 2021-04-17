describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('/')
            .intercept('POST', '/login').as('login');   
        })
    it('go to login page', () => {
        cy.url().should('include', '/signin')
        cy.title().should('eq', 'Cypress Real World App')
        cy.contains('Sign in').should('be.visible')
        })
     it('login with invalid data', () => {
        cy.invalid_login('wrong_username', 'wrong_password')
            .wait('@login').then(intercept => {
            cy.log(intercept)
        })
            })
    it('login with valid data', () => {
        cy.login('username', 'password')
            .wait('@login').then(intercept => {
            cy.log(intercept)
        })
            cy.get('.makeStyles-root-1').should('be.visible')
        })
    it('login without checkbox', () => {
        cy.login_checkbox('username', 'password')
            .wait('@login').then(intercept => {
            cy.log(intercept)
        })
        cy.get('.makeStyles-root-1').should('be.visible')
        })
    })