describe('Article Flow', () => {
  const userData = {
    email: `testuser${Date.now()}@example.com`,
    username: `testuser${Date.now()}`,
    password: 'password123'
  };
  const { email, username, password } = userData;

  const articleData = {
    title: `Test Article ${Date.now()}`,
    description: 'This is a test article description',
    body: 'This is the body of the test article.'
  };
  const { title, description, body } = articleData;

  before(() => {
    cy.login(email, username, password);
  });

  it('Should create an article', () => {
    cy.visit('https://conduit.mate.academy/editor');
    cy.url().should('contain', '/editor');
    cy.get('[placeholder="Article Title"]').type(title);
    cy.get('[placeholder="What\'s this article about?"]').type(description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(body);
    cy.contains('.btn', 'Publish Article').click();

    cy.get('h1').should('contain.text', title);
    cy.get('div > p').should('contain.text', body);
  });

  it('Should delete an article', () => {
    cy.createArticle(title, description, body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`article/${slug}`);
      });

    cy.contains('.btn', 'Delete Article').click();
    cy.contains('.nav-link', 'Global Feed').should('be.visible');
    cy.contains(title).should('not.exist');
  });
});
