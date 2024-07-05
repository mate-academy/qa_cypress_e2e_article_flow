describe('Article flow', () => {
  let user;
  let article;

  before(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generatearticle) => {
      article = generatearticle;
    });
  });

  it('create new article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.get('button[type="button"]')
      .click();
    cy.visit('/');
    cy.get('.nav > :nth-child(2) > .link')
      .click();
    cy.get('.col-md-9')
      .should('contain.text', article.title);
  });

  it('delete the article', () => {
    cy.visit('/user/login');
    cy.findByPlaceholder('Email')
      .type(user.email);
    cy.findByPlaceholder('Password')
      .type(user.password);
    cy.get('button[type="submit"]')
      .click();
    cy.get('.nav > :nth-child(2) > .link')
      .click();
    cy.get(`a[href*="/article/${article.title.replace(/\s+/g, '-')}"]`).click();
    cy.get('.article-actions > .article-meta > :nth-child(3)' +
      ' > .btn-outline-danger')
      .click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
