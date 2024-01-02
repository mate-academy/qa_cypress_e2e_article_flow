const { generateAticle } = require('../support/genArticle');

describe('test for article flow', () => {
  
  beforeEach(() => {
    cy.register();
  });

  it('should be able to create a new article', () => {
    const {title, description, body} = generateAticle();
    cy.visit('editor')
    cy.get('input[placeholder="Article Title"]')
      .type(title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(description);
    cy.get('textarea.form-control[placeholder="Write your article (in markdown)"]')
      .type(body);
    cy.get('.btn').click();
    cy.get('h1').should('contain.text', title)

  });

  it('should be able to delete article', () => {
    const {title, description, body} = generateAticle();
    cy.createArticle(title, description, body).then(({slug}) => {
      cy.intercept('DELETE', `/api/articles/${slug}`).as('deleteArticle');
      cy.visit(`/article/${slug}`);
      cy.contains('button.btn.btn-outline-danger.btn-sm', 'Delete Article')
        .click();
        cy.on('window:alert', (text) => {
          expect(text).should('contain.text', 'Do you really want to delete it?')
            return true;
        });  
      cy.wait('@deleteArticle', { timeout: 10000 })
        .its('response.statusCode') 
        .should('eq', 204);
    });
    
  });

  });