describe('The Article page', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should allow creating an article', () => {
    cy.login(user);
  
    cy.createArticle(article);

    cy.checkArticle(article, user);
  });

  it('should allow deleting an article', () => {
    cy.login(user);
  
    cy.createArticle(article);

    cy.deleteArticle(article, user);
  
    cy.checkArticleDeleted(article, user);
  });
});
