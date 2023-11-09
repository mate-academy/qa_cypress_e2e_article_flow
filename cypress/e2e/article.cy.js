describe('Article', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.contains('.btn', 'Publish')
      .click();
    cy.get('h1')
      .should('contain', article.title);
    cy.get('.article-content')
      .should('contain', article.body);
    cy.get('.author')
      .eq(0)
      .should('contain', user.username.toLowerCase());
    cy.contains('.btn', ' Edit Article')
      .eq(0)
      .should('exist');
    cy.contains('.btn', 'Delete Article')
      .eq(0)
      .should('exist');
  });

  it('should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
        cy.get('.btn')
          .contains('Delete Article').click();
        cy.on('window:confirm', (alert) => {
          expect(alert).to.equal('Do you really want to delete it?');
        });
        cy.url().should('equal', 'https://conduit.mate.academy/');
      });
    cy.url()
      .should('eq', Cypress.config().baseUrl);
    cy.contains('a', 'Global Feed')
      .click();
    cy.get('.article-preview')
      .should('not.contain', article.title);
    cy.get('.article-preview')
      .should('not.contain', article.description);
  });
});
