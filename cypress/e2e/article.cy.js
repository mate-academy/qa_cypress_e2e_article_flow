describe('Article', () => {
  const title = 'Title article';
  const description = 'Description acticle';
  const body = 'Body article';

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((generatedUser) => {
      cy.wrap(generatedUser).as('user');
    });
  });

  it('should create an article', function () {
    const { email, username, password } = this.user;

    cy.login(email, username, password);
    cy.createArticle(title, description, body);
    cy.visit('/');
    cy.contains('a', username.toLowerCase())
      .should('have.attr', 'href', `/profile/${username.toLowerCase()}`)
      .click();
    cy.contains('h1', `Article title: ${title}`).should('be.visible');
  });

  it('should delete the article', function () {
    const { email, username, password } = this.user;

    cy.login(email, username, password);
    cy.createArticle(title, description, body);
    cy.visit('/');
    cy.contains('a', username.toLowerCase())
      .should('have.attr', 'href', `/profile/${username.toLowerCase()}`)
      .click();
    cy.contains('h1', `Article title: ${title}`).should('be.visible');

    // Deleting
    cy.get('a[class="preview-link"]')
      .contains('h1', `Article title: ${title}`)
      .click();

    cy.contains('button', 'Delete Article').click();
  });
});
