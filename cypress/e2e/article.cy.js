const uniqueId = () => `${Date.now()}${Math.floor(Math.random() * 10000)}`;

describe('Article flow', () => {
  const id = uniqueId();
  const email = `user${id}@example.com`;
  const username = `user${id}`;
  const password = `Password${id}!`;
  const title = `Test Article ${id}`;
  const description = `Description ${id}`;
  const body = `Article body ${id}`;

  before(() => {
    cy.login(email, username, password);
  });

  it('should create an article', () => {
    cy.visit('/');

    cy.get('a[href*="editor"]').first().click();

    cy.get('input[placeholder="Article Title"]').type(title);
    cy.get('input[placeholder="What\'s this article about?"]').type(description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(body);

    cy.contains('button', 'Publish Article').click();

    cy.contains('h1', title).should('be.visible');
    cy.contains(body).should('be.visible');
  });

    it('should delete an article', () => {
    const deleteId = uniqueId();

    cy.login(
      `delete${deleteId}@example.com`,
      `delete${deleteId}`,
      `Password${deleteId}!`,
    );

    cy.createArticle(title, description, body);

    cy.visit('/');
    cy.visit('/profile/' + `delete${deleteId}`);
    cy.contains('a.preview-link', title).click();
    cy.contains('button', 'Delete Article').click();
    cy.contains('h1', title).should('not.exist');
  });
});
