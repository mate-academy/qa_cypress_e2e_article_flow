describe('Article Flow', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.visit('');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generatearticle) => {
      article = generatearticle;
    });
  });

  it('should create an article', () => {
    cy.loginAutho(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('.navbar').should('contain', user.username);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tagList + '{enter}');
    cy.contains('.btn', 'Publish Article').click();
    cy.url().should('contain', article.title);
    cy.get('h1').should('contain', article.title);
    cy.get('.author').should('contain', user.username);
    cy.get('.col-md-12').should('contain', article.body);
    cy.get('.tag-default').should('contain', article.tagList);
  });

  it('should delete an article', () => {
    cy.loginAutho(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('.navbar').should('contain', user.username);
    cy.createArticle(article.title, article.description,
      article.body, article.tagList);
    cy.visit('/profile/' + user.username);
    cy.get('h1').should('contain', article.title).click();
    cy.get('h1').should('contain', article.title);
    cy.get('.author').should('contain', user.username);
    cy.get('.col-md-12').should('contain', article.body);
    cy.contains('.btn', 'Delete Article').click();
    cy.visit('profile/' + user.username);
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
