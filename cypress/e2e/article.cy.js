describe('Conduit', () => {
    before(() => {
      cy.clearCookies(); 
      cy.clearLocalStorage();
      cy.visit('/user/login');
      cy.get('input[placeholder="Email"]').should('be.visible');
      cy.get('input[placeholder="Email"]').type('hogwortsexpress@gmail.com');
      cy.get('input[placeholder="Password"]').type('Qwert123!');
      cy.get('.btn').click();
      cy.contains("Your Feed",).should("exist");
    });

  it('Should create and delete an article', () => {
      
      cy.get("a").contains("New Article").click();
      cy.get('input[placeholder="Article Title"]').type('Young wizard');
      cy.get('input[placeholder="What\'s this article about?"]').type('about magic');
      cy.get('textarea[placeholder="Write your article (in markdown)"]').type('The story of the young wizard Harry Potter and his friends at Hogwarts.');
      cy.get('input[placeholder="Enter tags"]').type('HP{enter}');
      cy.get('button[type="button"]').contains('Publish Article').click();

      cy.contains('Young wizard',).should('exist');
      cy.contains('HP', { timeout: 10000 }).should('exist');

      cy.contains('Young wizard').should('exist')
      .parent() 
      .find('button.btn-outline-danger')
      .click();

    });
  });
