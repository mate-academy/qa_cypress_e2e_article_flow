const faker = require("faker");

describe('Conduit', () => {
  let user;

  const article = {
    title:  faker.lorem.word(),
    description: faker.lorem.word(),
    body: faker.lorem.words()
  }
  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    })
  });

  it('should provide an ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('.btn.btn-lg.pull-xs-right.btn-primary').click();
    
    cy.get('.banner').should('contain', article.title);
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('/');
    cy.get('[alt="your profile image"]').click();
    cy.get('.article-preview').contains(article.title).click();
    cy.get('.banner').contains('Delete Article').click();
    cy.wait(1000);
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Do you really want to delete it?`);
    });
    cy.wait(1000);
    cy.get('[alt="your profile image"]').click();
    
    cy.get('.article-preview').should('not.contain', article.title);
  });
});
