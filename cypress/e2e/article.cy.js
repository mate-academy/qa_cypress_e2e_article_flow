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
  it('should be created by new article form', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.get('[placeholder="Article Title"]')
      .type(article.title);
    cy.get('[placeholder^="What\'s this"]')
      .type(article.description);
    cy.get('[placeholder^="Write your"]')
      .type(article.body);
    cy.get('[type="button"]')
      .click();
    cy.get('.article-page')
      .should('contain', article.title);
    cy.get('.article-content')
      .should('contain', article.body);
    cy.get('.btn')
      .contains('Edit Article')
      .should('be.visible');
    cy.get('.btn')
      .contains('Delete Article')
      .should('be.visible');
  });
  it('should be deleted by delete button', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
        cy.get('.btn')
          .contains('Delete Article').click();
        cy.on('window:confirm', (str) => {
          expect(str).to.equal('Do you really want to delete it?');
        });
        cy.url().should('equal', 'https://conduit.mate.academy/');
      });
  });
});
