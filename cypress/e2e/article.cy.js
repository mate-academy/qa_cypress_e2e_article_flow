describe('', () => {
  let user;
  let article;

  before(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should provide the ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findPlaceholder('Article Title')
      .type(article.title);
    cy.findPlaceholder(`What's this article about?`)
      .type(article.description);
    cy.findPlaceholder(`Write your article (in markdown)`)
      .type(article.text);
    cy.get('.btn')
      .click();
    cy.get('.article-page')
    .should('contain', article.title)
    .should('contain', article.text);
    cy.get('.container > .article-meta')
      .should('contain', user.username.toLowerCase());
  });

  it.only('should provide the ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.text)
      .then((response) => {
        cy.visit(`/article/${response.body.article.slug}`);
        cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger')
          .click();
        cy.url()
          .should('equal', 'https://conduit.mate.academy/');
        cy.get('.nav > :nth-child(2) > .link')
          .click();
        cy.get('.col-md-9')
        .should('not.contain', article.title)
        .should('not.contain', article.description)
        .should('not.contain', article.text)
      });
    });
});
