describe('Transactions test', () => {
    beforeEach(() => {
        cy.intercept('POST', '/login').as('apiLogin');  
        cy.intercept('POST', '/transactions').as('apiPay');
    })
    it('Create new payment', () => {
        cy.visit('/');
        cy.login('wlodarqa', 'test'); //function
        cy.wait('@apiLogin').then(intercept => {
            expect(intercept.response.statusCode).to.equal (200);
            expect(intercept.response.body.user.id).to.equal ('t45AiwidW');
            expect(intercept.request.body).to.deep.equal ({type: 'LOGIN', username: 'wlodarqa', password: 'test'});
            })
        cy.get('.MuiButton-label').click()
        cy.get('[data-test=user-list-item-qywYp6hS0U]').click()
        cy.payment('100', 'test pay'); //function
        cy.wait('@apiPay').then(intercept => {
            expect(intercept.response.statusCode).to.equal (200);
            expect(intercept.request.body).to.deep.equal ({transactionType:"payment", amount: "100", description: "topic", senderId: "t45AiwidW", receiverId: "qywYp6hS0U"});
        })
        cy.get('[data-test=alert-bar-success]').should('be.visible')
        cy.get('.MuiStepLabel-iconContainer').should('be.visible')
        cy.getCookie('connect.sid').should('exist');
    })
})   