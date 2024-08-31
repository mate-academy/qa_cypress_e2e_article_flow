/// <reference types='cypress' />

describe('Conduit', () => {
    before(() => {
      cy.clearCookies(); 
      cy.clearLocalStorage();
      cy.visit('/user/login');
      cy.wait(1000);
      cy.get('input[placeholder="Email"]').type('piratwisna@dfgh.cju');
      cy.get('input[placeholder="Password"]').type('qweqwe');
      cy.get('.btn').click();
      cy.contains("Your Feed", { timeout: 10000 }).should("exist");
    });
  
    it('Should create and delete an article', () => {
      // Create an article
      cy.get("a").contains("New Article").click();
      cy.get('input[placeholder="Article Title"]').type('HARRY POTTER');
      cy.get('input[placeholder="What\'s this article about?"]').type('about friendship and courage');
      cy.get('textarea[placeholder="Write your article (in markdown)"]').type('The adventures of the young wizard Harry Potter and his friends at Hogwarts School of Witchcraft and Wizardry.');
      cy.get('input[placeholder="Enter tags"]').type('HP{enter}');
      cy.get('button[type="button"]').contains('Publish Article').click();
  
      // Check that the article has been created
      cy.contains('HARRY POTTER', { timeout: 10000 }).should('exist');
      cy.contains('HP', { timeout: 10000 }).should('exist');
  
      // Wait for a moment to ensure the deletion button is available
      cy.wait(2000);
  
      // Delete the article
      cy.contains('HARRY POTTER') 
      .parent() 
      .find('button.btn-outline-danger')
      .click();

    });
  });
  
