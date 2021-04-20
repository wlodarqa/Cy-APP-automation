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
Cypress.Commands.add('login', (username, password) => {
    cy.fixture('user').then(user => {
        const username = user.id 
        const password = user.password
    cy.get('#username').type(username)
    cy.get('#password').type(password)
        
})
})
Cypress.Commands.add('invalidLogin', (wrong_username, wrong_password) => {
    cy.get('#username').type('wrong name')
    cy.get('#password').type('wrong password')
    cy.get('.MuiButton-label').click()
    cy.get('.MuiAlert-message').should('be.visible')
})

