// cypress/integration/demoBlazeTests.spec.js

describe('DemoBlaze E2E Tests', () => {
   it('should register a new user', () => {
      cy.visit('https://www.demoblaze.com/');
      cy.get('#signin2').click();
      cy.get('#sign-username').type('operada1');
      cy.get('#sign-password').type('opera123$');
      cy.contains('.btn', 'Sign up').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Sign up successful.');
      });
    });

   it('should login', () => {
     cy.visit('https://www.demoblaze.com/');
     cy.get('#login2').click();
     cy.get('#loginusername').type('operada1');
     cy.get('#loginpassword').type('opera123$');
     cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
     cy.get('.nav-link')
      .should('contain', 'Welcome operada1');
   });
  
   it('should add Samsung Galaxy s6 to the cart', () => {
     cy.visit('https://www.demoblaze.com/');
     cy.get(':nth-child(7) > .card > .card-block > .card-title > .hrefch').click();
     cy.get('.col-sm-12 > .btn').click();
     cy.on('window:alert', (str) => {
       expect(str).to.equal('Product added.');
     });
   });
 });
 