describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.url().should('include', '/signin');
        cy.title().should('eq', 'Cypress Real World App');
        cy.contains('Sign in').should('be.visible');
        cy.intercept('POST', '/login').as('apiLogin');  
        cy.getCookie('connect.sid').should('not.exist'); 
    })

    it('login with invalid data', () => {
        cy.login('wrong_username', 'wrong_password');
        cy.wait('@apiLogin').then(intercept => {
        expect(intercept.response.statusCode).to.equal (401);
        })
        cy.get('.MuiAlert-message').should('be.visible');
    })

    it('login with valid data', () => {
        cy.login('wlodarqa', 'test');
        cy.wait('@apiLogin').then(intercept => {
        expect(intercept.response.statusCode).to.equal (200);
        expect(intercept.request.body.remember).to.not.exist
        expect(intercept.response.body.user.id).to.equal ('t45AiwidW');
        expect(intercept.request.body).to.deep.equal ({type: 'LOGIN', username: 'wlodarqa', password: 'test'});
        })
        cy.url().should('eq', 'http://localhost:3000/')
        cy.get('.makeStyles-root-1').should('be.visible');
        cy.getCookie('connect.sid').should('exist');
    })
    it('login with valid data and checkbox', () => {
        cy.login('wlodarqa', 'test', true);   
        cy.wait('@apiLogin').then(intercept => {
        expect(intercept.response.statusCode).to.equal (200);
        expect(intercept.request.body.remember).to.exist;
        expect(intercept.response.body.user.id).to.equal ('t45AiwidW');
        expect(intercept.request.body).to.deep.equal ({type: "LOGIN", username: "wlodarqa", password: "test", remember: true});
        })
        cy.get('.makeStyles-root-1').should('be.visible');
        cy.getCookie('connect.sid').should('exist');
    })
})
