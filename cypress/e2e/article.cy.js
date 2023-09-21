describe('Article', () => {
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

  it('should provide the ability to login', () => {
    cy.findByPlaceholder('UserName')
      .type(user.username);
    cy.findByPlaceholder('Password')
      .type(user.password);
    cy.get('button[type="submit"]').click();

    cy.get('.nav-link')
      .should('contain', user.username);
    cy.url()
      .should('contain', 'https://conduit.mate.academy');
  });

  it('should provide the ability to create new article', () => {
    cy.login(user.username, user.password);
    cy.visit('https://conduit.mate.academy');

    cy.get('.nav-link')
      .should('contain', 'New Article').click();
    cy.url()
      .should('contain', 'https://conduit.mate.academy/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.get('What\'s this article about?')
      .type(article.description);
    cy.get('Write your article (in markdown)')
      .type(article.body);
    cy.get('Enter tags')
      .type(article.tags);
    cy.contains('Publish article')
      .click();

    cy.url()
      .should('contain', 'https://conduit.mate.academy/article');
  });

  it('should provide the ability to delete article', () => {
    cy.login(user.username, user.password);

    cy.createArticle(article.title,
      article.description, article.body, article.tags)
      .then((response) => {
        cy.visit(`/articles/${response.body.article.slug}`);
      });
  });
});
