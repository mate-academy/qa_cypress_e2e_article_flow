import { faker } from '@faker-js/faker';
/// <reference types='cypress' />

describe('', () => {
  let user;
  let article;
  const articleTitle = faker.lorem.word() + `${faker.number.int({ min: 500, max: 1000 })}`;
  const whatsArticle = faker.lorem.word();
  const writeArticle = faker.lorem.text();
  const tag = faker.lorem.word();

  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should allow user', () => {
    cy.reload();

    cy.contains('a', 'New Article').click();
    cy.get('[placeholder^="Article Title"]').type(articleTitle);
    cy.get('[placeholder^="What\'s this article about?"]').type(whatsArticle);
    cy.get('[placeholder^="Write your article"]').type(writeArticle);
    cy.get('[placeholder^="Enter tags"]').type(`${tag}{enter}`);

    cy.contains('.btn', 'Publish Article').click();

    cy.url().should('contain', articleTitle);
    cy.get('h1').should('contain', articleTitle);
  });

  it('should allow user123', () => {
    cy.createArticle(article.title, article.description, article.body);

    cy.reload();

    cy.contains('a', 'Global Feed').click();
    cy.contains('a', article.title).click();

    cy.url().should('contain', article.title);
    cy.get('h1').should('contain', article.title);

    cy.contains('button', 'Delete Article').click();

    cy.contains('.nav-link', user.username.toLowerCase()).click();
    cy.contains('.article-preview', 'No articles are here... yet.')
      .should('exist');
  });
});
