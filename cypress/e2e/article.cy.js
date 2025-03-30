describe('Article page', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
  });

  it('should allow user to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.body);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.description);
    cy.findByPlaceholder('Enter tags')
      .type(article.tag + '{enter}');
    cy.get('.btn')
      .click();

    cy.get('h1').contains(article.title);
    cy.get('.col-md-12').contains(article.description);
    cy.get('.tag-default').contains(article.tag);
  });

  it('should allow user to delete the article', () => {
    const lowerName = user.username.toLowerCase();
    cy.visit('/');
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('/profile/' + lowerName);
    cy.visit('/profile/' + lowerName);
    cy.get('h1').contains(article.title).click();
    cy.get('.btn').contains('Delete Article').click();

    cy.visit('/profile/' + lowerName);
    cy.get('.article-preview').should('not.have.text', article.title);
  });
});
