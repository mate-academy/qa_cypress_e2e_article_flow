describe('Article page', () => {
  let user;
  let article;
  const deleteAlert = 'Do you really want to delete it?';
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('Should provide the ability to create an article', () => {
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
    cy.get('.col-md-12')
      .should('contain', article.body);
    cy.get('.article-meta')
      .eq(0)
      .should('contain', user.username.toLowerCase());
    cy.contains('.btn', ' Edit Article')
      .eq(0)
      .should('exist');
    cy.contains('.btn', 'Delete Article')
      .eq(0)
      .should('exist');
  });

  it('Should provide the ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
        cy.get('h1')
          .should('contain', article.title);
        cy.contains('.btn', 'Delete Article')
          .eq(0)
          .click();
        cy.on('window:alert', (alert) => {
          expect('alert').to.equal(deleteAlert);
        });
        cy.url()
          .should('eq', Cypress.config().baseUrl);
        cy.contains('a', 'Global Feed')
          .click();
        cy.get('.col-md-9')
          .should('not.contain', article.title);
        cy.get('.col-md-9')
          .should('not.contain', article.description);
      });
  });
});
