describe('Article create and remove', () => {
  const title = 'This is article body';
  const description = 'Some article description';
  const body = 'Simple article body';

  beforeEach(() => {
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
    });
  });

  it('Should create article with provided text', () => {
    cy.visit('editor');

    cy.get(`input[placeholder="Article Title"]`).type(title);

    cy.get(`input[placeholder="What's this article about?"]`).type(description);

    cy.get(`textarea[placeholder="Write your article (in markdown)"]`).type(
      body
    );

    cy.get('button').click();

    cy.get('h1').contains(title);

    cy.get(' div > p').contains(body);
  });

  it('Should remove article', () => {
    cy.createArticle(title, description, body).then((response) => {
      const slug = response.body.article.slug;

      cy.visit(`article/${slug}`);
    });
    cy.contains('button', 'Delete Article').click();

    cy.get('div[class=article-preview]').contains(
      'No articles are here... yet.'
    );
  });
});
