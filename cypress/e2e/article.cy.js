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

    cy.visit('');
  });

  it('should provide an ability to create article', () => {
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
    
    cy.contains('.banner', article.title)
      .should('exist');
  });

  it('should provide an ability to delete article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
      
      cy.visit(`article/${slug}`);
      });

    cy.contains('.btn', 'Delete Article')  
      .click();

    cy.contains('.nav-link', 'Global Feed')
      .should('be.visible');

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
