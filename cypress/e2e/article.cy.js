describe('Article page', () => {
  let user;
  let article;
  const deleteAlert = 'Do you really want to delete it?';

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should have an ability to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.findByPlaceholder('Article Title')
      .type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(article.tag).type('{enter}');
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.get('h1')
      .should('contain', article.title);
    cy.get('p')
      .should('contain', article.body);
    cy.get('.tag-list')
      .should('contain', article.tag);
    cy.get('.author')
      .eq(0)
      .should('contain', user.username.toLowerCase());
    cy.contains('.btn', 'Edit Article')
      .eq(0)
      .should('exist');
    cy.contains('.btn', 'Delete Article')
      .eq(0)
      .should('exist');
});

  it('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body, article.tag)
      .then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`article/${slug}`);
      cy.get('h1')
        .should('contain', article.title);
      cy.contains('.btn', 'Delete Article')
        .eq(0)
        .click();
      cy.on('window:alert', (alert) => {
        expect('alert').to.equal(alert.delete);
      cy.get('button', 'Ok')
        .click();
      });
      cy.get('.col-md-9')
        .should('contain', 'No articles are here... yet.');
      cy.get('.col-md-9')
        .should('not.contain', article.title);
  });
});
});
