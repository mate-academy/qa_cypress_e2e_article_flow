describe(`Create and delete the article in 'conduit'`, () => {
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

  it('Create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('[placeholder="Enter tags"]').type(`${article.tag} {enter}`);
    cy.contains('.btn', 'Publish Article').click();
    cy.get('h1').should('contain', article.title);
    cy.get('p').should('contain', article.body);
    cy.get('.tag-list').should('contain', article.tag);
    cy.get('.author').eq(0).should('contain', user.username.toLowerCase());
    cy.contains('.btn', 'Delete Article').eq(0).should('exist');
  });

  it('Delete the article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    ).then((response) => {
      const slug = response.body.article.slug;

      cy.visit(`article/${slug}`);
      cy.get('h1').should('contain', article.title);
      cy.contains('.btn', 'Delete Article').eq(0).click();
      cy.on('window:alert', (alert) => {
        expect('alert').to.equal(alert.delete);

        cy.get('button', 'Ok').click();
      });
      cy.get('.col-md-9').should('contain', 'No articles are here... yet.');
      cy.get('.col-md-9').should('not.contain', article.title);
    });
  });
});
