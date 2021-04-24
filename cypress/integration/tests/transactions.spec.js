describe('Transactions test', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.intercept('POST', '/login').as('apiLogin');  
        cy.intercept('POST', '/transactions').as('apiPay');
        cy.login('wlodarqa', 'test'); //function
        cy.wait('@apiLogin').then(intercept => {
            expect(intercept.response.statusCode).to.equal (200);
            expect(intercept.response.body.user.id).to.equal ('t45AiwidW');
            expect(intercept.request.body).to.deep.equal ({type: 'LOGIN', username: 'wlodarqa', password: 'test'});
            })
    })
    it('Create new payment', () => {
        cy.get('.MuiButton-label').click();
        cy.get('[data-test=user-list-item-qywYp6hS0U]').click();
        cy.payment('100', 'test pay'); //function
        cy.wait('@apiPay').then(intercept => {
        expect(intercept.response.statusCode).to.equal (200);
        expect(intercept.request.body.transactionType).to.equal ('payment');
        expect(intercept.request.body).to.deep.equal ({transactionType: "payment", amount: "100", description: "test pay", senderId: "t45AiwidW", receiverId: "qywYp6hS0U"});
        expect(intercept.state).to.equal('Complete');
        })
        cy.get('[data-test=alert-bar-success]').should('be.visible');
        cy.get('.MuiStepLabel-iconContainer').should('be.visible');
        cy.getCookie('connect.sid').should('exist');
    })
    it('Create pay request', () => {
        cy.get('.MuiButton-label').click();
        cy.get('[data-test=user-list-item-qywYp6hS0U]').click();
        cy.requestPay('100', 'test pay request'); //function
        cy.wait('@apiPay').then(intercept => {
        expect(intercept.response.statusCode).to.equal (200);
        expect(intercept.request.body.transactionType).to.equal ('request');
        expect(intercept.request.body).to.deep.equal ({transactionType: "request", amount: "100", description: "test pay request", senderId: "t45AiwidW", receiverId: "qywYp6hS0U"});
        expect(intercept.state).to.equal('Complete');
        })
        cy.get('[data-test=alert-bar-success]').should('be.visible');
        cy.get('.MuiStepLabel-iconContainer').should('be.visible');
        cy.getCookie('connect.sid').should('exist'); 
    })
})   
