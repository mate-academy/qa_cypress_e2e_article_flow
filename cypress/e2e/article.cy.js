//<reference types='cypress' />

describe('Article', () => {
  let user;
  let createArticle;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      createArticle = generateArticle;
    });

    cy.visit('');
  });


  it('article should be created', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]')
      .type(createArticle.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(createArticle.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(createArticle.body);
    cy.contains('.btn', 'Publish Article')
      .click();
    cy.contains('.container', createArticle.title)
      .should('exist');
  });

  it('article should be deleted', () => {
    cy.login(user.email, user.username, user.password);

    cy.createArticle(createArticle.title, createArticle.description, createArticle.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/article/${slug}`);
    });

    cy.contains('.btn', 'Delete Article')
      .click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here');
  });

});