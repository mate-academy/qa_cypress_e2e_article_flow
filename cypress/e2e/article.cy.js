describe('Page', () => {

  let article;
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    })
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
  });

  it('User should be able to create new article', () => {
    cy.login(user.email, user.username, user.password)
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder(`What's this article about?`).type(article.body);
    cy.findByPlaceholder('Write your article (in markdown)', 'textarea').type(article.description);
    cy.findByPlaceholder('Enter tags').type(article.tag + '{enter}');
    cy.get('.btn').click();
    cy.get('h1').contains(article.title);
    cy.get('.col-md-12').contains(article.description);
  });

  it.only('User should be able to delete article', () => {
    const lowerCaseName = user.username.toLowerCase();

    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('/profile/' + lowerCaseName);
    cy.visit('/profile/' + lowerCaseName);
    cy.get('h1').contains(article.title).click();
    cy.get('.btn').contains('Delete Article').click();
    cy.visit('/profile/' + lowerCaseName);
    cy.get('.article-preview').contains('No articles are here... yet.');
  });
});
