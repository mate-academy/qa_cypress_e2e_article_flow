/// <reference types='cypress' />

describe('New Article', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should provide an ability to create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('[placeholder="Enter tags"]').type(`${article.tag}{enter}`);
    cy.contains('button', 'Publish Article').click();
    cy.get('h1').should('contain', article.title);
    cy.get('.col-md-12').should('contain', article.body);
    cy.get('.tag-list').should('contain', article.tag);
  });

  it('should provide an ability to delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      });
    cy.contains('.btn', 'Delete Article').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
    cy.url().should('include', '/');
  });
});
