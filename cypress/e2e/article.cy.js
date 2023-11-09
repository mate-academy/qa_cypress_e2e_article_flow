describe('Article page', () => {
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

  it('Should provide the ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.get('.btn')
      .click();
    cy.get('.banner')
      .should('contain', article.title);
    cy.get('.col-md-12')
      .should('contain', article.body);
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
        cy.get('.banner')
          .should('contain', article.title);
        cy.contains('.btn', 'Delete Article')
          .eq(0)
          .click();
        cy.on('window:confirm', (str) => {
          expect(str).to.equal('Do you really want to delete it?');
        });
        cy.url().should('eq', Cypress.config().baseUrl);
      });
  });
});
