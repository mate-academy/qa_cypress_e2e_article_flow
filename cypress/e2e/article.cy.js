/// <reference types='cypress' />

describe('Conduit', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('user is not logged-in', () => {
    cy.visit('user/login');
    cy.url().should('include', 'user/login');
    cy.get('.nav-link')
      .should('contains.text', 'Sign in')
      .should('be.visible');
  });

  it('should login user with valid credantial', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('');
  });

  it('should allow user article creation', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.findByPlaseholder('Article Title').type(article.title);
    cy.findByPlaseholder(`What's this article about?`).type(article.description);
    cy.findByPlaseholder('Write your article (in markdown)').type(article.body);
    cy.contains('[type="button"]', 'Publish Article').click();

    cy.get('h1').should('contain.text', article.title);
  });

  it('should allow user article deletion', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    ).then((response) => {
      const slug = response.body.article.slug;

      cy.visit(`/article/${slug}`);
    });

    cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger')
      .click();

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');

    cy.url().should('not.contain', article.title);

    cy.get('.nav-link').should('contain.text', 'Your Feed');
    cy.get('.nav-link').should('contain.text', 'Global Feed');
  });
});
