describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.url().should('include', '/signin');
        cy.title().should('eq', 'Cypress Real World App');
        cy.contains('Sign in').should('be.visible');
        cy.intercept('POST', '/login').as('apiLogin');   
    })

    it('login with invalid data', () => {
        cy.login('wrong_username', 'wrong_password');
        cy.wait('@apiLogin').then(intercept => {
            cy.log(intercept.request.body);
            cy.log(intercept.response.body);
            expect(intercept.response.statusCode).to.equal (401);
        })
        cy.get('.MuiAlert-message').should('be.visible')
    })

    it('login with valid data', () => {
        cy.login('wlodarqa', 'test');
        cy.wait('@apiLogin').then(intercept => {
            cy.log(intercept.request.body);
            expect(intercept.request.body.remember).to.not.exist
        })
        cy.get('.makeStyles-root-1').should('be.visible');
    })

    it('login with valid data and checkbox', () => {
        cy.login('wlodarqa', 'test', true);   
        cy.wait('@apiLogin').then(intercept => {
            cy.log(intercept);
            cy.log(intercept.request.body.remember).as('remember');
            expect(intercept.request.body.remember).to.exist;
            expect(intercept.request.body.remember).to.be.true;

       })
        cy.get('.makeStyles-root-1').should('be.visible');
    })
})