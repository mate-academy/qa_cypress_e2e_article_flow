describe('', () => {
  let user;
  let article;

  before(() => {
  });
  beforeEach(() => {
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .as('article');

    // assert article created code
    cy.get('@article').should((response) => {
      expect(response.status).to.eq(200);
    });
    cy.visit('https://conduit.mate.academy/');
  });

  it('should delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .as('article');

    // assert response code to be 200
    cy.get('@article').should((response) => {
      expect(response.status).to.eq(200);
    });

    // access response slug and delete article
    cy.get('@article').then((response) => {
      cy.deleteArticle(response.body.article.slug).as('delete');

      // assert delete status code
      cy.get('@delete').should((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });
});
