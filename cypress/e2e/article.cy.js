/// <reference types='cypress' />

describe('', () => {
  let user;
  let article;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    })
  });

  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/');
  })

  it('Create the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.reload();
    
    cy.contains('.nav-link', 'New Article').click();

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.contains('.btn', 'Publish').click('');
    cy.url().should('include', article.title);
  });

  it('Delete the article', () => {
    cy.login(user.email, user.username, user.password);
    cy.reload();

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`https://conduit.mate.academy/article/${slug}`);

        cy.contains('.btn', 'Delete Article').eq(0).click('');

//      cy.url(`https://conduit.mate.academy/article/${slug}`).should('not.exist');
      });
      cy.url().should('eq', 'https://conduit.mate.academy/')
  });
});
