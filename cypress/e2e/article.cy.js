describe('This article test', () => {
  let fakeuser;
  beforeEach(() => {
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

  it('should create a new article', () => {
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

  it('should delete an article', () => {
    cy.login(fakeuser.email, fakeuser.username, fakeuser.password);
    cy.visit('https://conduit.mate.academy');
    cy.createArticle(article.title, article.description, article.body).then(
      (response) => {
        const article = {
          slug: response.body.article.slug,
        };
        cy.log('Article slug: ', article.slug);
        cy.visit(`https://conduit.mate.academy/article/${article.slug}`);
      }
    );

    cy.contains('button', 'Delete Article').click();
    cy.contains('.article-preview', 'No articles are here... yet.').should(
      'be.visible'
    );

    cy.request({
      url: `https://conduit.mate.academy/article/${article.slug}`,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404);
    });
  });
});
