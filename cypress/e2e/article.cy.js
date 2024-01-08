describe('Article flow', () => {
  let user;
  let article;
  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be able to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.contains('.container', article.title)
      .should('exist');
    cy.contains('.col-md-12', article.body);
  });

  it('should able to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
        cy.get('.article-page')
          .should('contain', article.title);
        cy.get('.article-page')
          .should('contain', article.body);
        cy.contains('Delete Article')
          .click();
        cy.on('window:confirm', (str) => {
          expect(str).to.equal('Do you really want to delete it?');
        });
        cy.get('.article-preview')
          .should('contain', 'No articles are here... yet.');
        cy.url().should('equal', 'https://conduit.mate.academy/');
      });
  });
});
