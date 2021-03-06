// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password, remember = false) => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    if (remember) {
        cy.get('[type="checkbox"]').check()
    }
    cy.get('.MuiButton-label').click()   
})
Cypress.Commands.add('payment', (amount, topic) => {
    cy.get('#amount').type(amount)
    cy.get('#transaction-create-description-input').type(topic)
    cy.get('.MuiButton-label').contains('Pay').click()
})
Cypress.Commands.add('requestPay', (amount, topic) => {
    cy.get('#amount').type(amount)
    cy.get('#transaction-create-description-input').type(topic)
    cy.get('.MuiButton-label').contains('Request').click()
})