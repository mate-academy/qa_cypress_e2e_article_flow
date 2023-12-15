describe('Conduit article', () => {
  let article = {};
  let user = {};

  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/');
    cy.task('generateUser').then((newUser) => {
      cy.signUp(newUser);
      cy.reload();
      user = newUser;
    });
    cy.task('generateArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should be able to create a new article', () => {
    cy.get('.navbar')
      .should('contain', user.username.toLowerCase());
    cy.contains('a', 'New Article')
      .click();
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder(`What's this article about?`)
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(`${article.tag}{enter}`);
    cy.contains('button', 'Publish Article')
      .click();
    cy.contains('a', user.username.toLowerCase())
      .click();
    cy.reload();
    cy.get('.row')
      .should('contain', article.title);
    cy.get('.row')
      .should('contain', article.description);
  });
  it('should create an article and delete it', () => {
    cy.get('.navbar')
      .should('contain', user.username.toLowerCase());
    cy.createArticle(article.title, article.description, article.body);
    cy.contains('a', user.username.toLowerCase())
      .click();
    cy.reload();
    cy.get('.row')
      .should('contain', article.title);
    cy.get('.row')
      .should('contain', article.description);
    cy.deleteArticle();
    cy.reload();
    cy.get('.row')
      .should('not.contain', article.title);
  });
});
