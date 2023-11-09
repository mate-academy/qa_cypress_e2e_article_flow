describe('', () => {
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

  it('should be creating new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.desription);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('.btn')
      .should('contain', 'Publish Article')
      .click();

    cy.get('.article-page')
      .should('contain', article.title);
    cy.get('.article-page')
      .should('contain', article.body);
    cy.get('.btn')
      .should('contain', 'Edit Article')
      .should('be.visible');
    cy.get('.btn')
      .should('contain', 'Delete Article')
      .should('be.visible');
  });

  it('should be delete article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.desription, article.body)
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
