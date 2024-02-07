describe('Counduit', () => {
  let user;
  let article;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should allow to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit(`/profile/${user.username.toLowerCase()}`);

    cy.get('.nav-link').should('contain', user.username.toLowerCase());
    cy.contains('.nav-link', 'New Article').click();

    cy.url().should('include', '/editor');
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(article.body);
    cy.findByPlaceholder('Enter tags')
      .type(`${user.username}{enter}`);

    cy.get('.btn').contains('Publish Article').click();

    cy.get('.banner').contains(article.title);
    cy.url().should('include', '/article/');
    cy.get('.col-md-12').should('contain', article.body);
    cy.get('.info > .author')
      .should('contain', user.username.toLowerCase());
  });

  it('should provide an ability to delete an article', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
        cy.contains('.btn', 'Delete Article').click();

        cy.on('window:confirm', (confirm) => {
          expect(confirm).to.equal('Do you really want to delete it?');
        });

        cy.url().should('equal', 'https://conduit.mate.academy/');

        cy.get('.sidebar').should('contain', 'Popular Tags');
      });
  });
});
