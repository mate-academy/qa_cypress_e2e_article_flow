/// <reference types='cypress' />

describe('User\'s flow', () => {
   beforeEach(() => {
       cy.visit('https://www.demoblaze.com/')
   });

   it('should provide an ability to register the user', () => {
       cy.get('#signin2')
           .click();
       cy.get('#sign-username')
           .type('qasep23');
       cy.get('#sign-password')
           .type('Qwer123!');
       cy.get('.btn-primary').contains('Sign up')
           .click();
   });
  
   it('should provide an ability to log in with valid credentials', () => {
       cy.get('#login2')
           .click();
       cy.get('#loginusername')
           .type('qasep23');
       cy.get('#loginpassword')
           .type('Qwer123!');
       cy.get('.btn-primary').contains('Log in')
           .click();
   });

   it('should provide an ability to add Samsung Galaxy s6 to the cart', () => {
       cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch')
           .contains('Samsung galaxy s6')
           .click();
       cy.get('.col-sm-12 > .btn').contains('Add to cart')
           .click();
       cy.on('window:alert', (str) => {
       expect(str).to.equal('Product added');
       });
   });
});