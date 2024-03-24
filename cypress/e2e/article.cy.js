describe('This article test', () => {
  let fakeuser;
  before(() => {
    cy.visit('https://conduit.mate.academy');
    cy.task('generateUser').then((generateUser) => {
      fakeuser = generateUser;
    });
  });

  const article = {
    title: 'SunnyDay' + Math.floor(Math.random() * 1000),
    description: 'Hitrii lis',
    body: 'Everybody',
  };

  it.skip('should create a new article', () => {
    cy.login(fakeuser.email, fakeuser.username, fakeuser.password);
    cy.visit('https://conduit.mate.academy');
    cy.get('[href="/editor"]').click();
    cy.get('.form-control.form-control-lg').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(
      article.description
    );
    cy.get('[placeholder^="Write your article"]').type(article.body);
    cy.get('.btn.btn-lg.pull-xs-right.btn-primary')
      .click()
      .then((result) => {
        cy.wait(2000);
        cy.contains('.nav-link', 'Home').click();
        cy.contains('a', 'Global Feed').click();
        cy.contains('h1', article.title).should('contain', article.title);
        cy.contains('p', article.description).should(
          'contain',
          article.description
        );
        cy.contains('.author', fakeuser.username.toLowerCase()).should(
          'contain',
          fakeuser.username.toLowerCase()
        );
      });
  });

  it.only('should delete an article', () => {
    cy.login(fakeuser.email, fakeuser.username, fakeuser.password);
    cy.visit('https://conduit.mate.academy');
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('https://conduit.mate.academy');
    cy.contains('a', 'Global Feed').click();
    cy.intercept(
      'GET',
      'https://conduit.mate.academy/_next/data/prXNDmVQlPmg2o-RAU2Mw/article/*'
    ).as('getArticle');
    cy.contains('h1', article.title).click();
    cy.wait('@getArticle').then((interception) => {
      const articleSlug = interception.response.body?.slug;
      cy.log(`Article Slug: ${articleSlug}`);
      cy.contains('button', 'Delete Article').click();
      cy.contains('.article-preview', 'No articles are here... yet.').should(
        'be.visible'
      );
      cy.visit(`https://conduit.mate.academy/article/${articleSlug}`);
      cy.intercept('/not-found', {
        statusCode: 404,
      }).should('exist');
    });
  });
});
