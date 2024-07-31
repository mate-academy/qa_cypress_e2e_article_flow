
import { generateArticle } from '../support/generateArticle';

describe('Conduit', () => {
  const article = generateArticle();
  let articleUrl;
  const user = {
    username: 'romantest1234',
    email: 'romanqatest@gmail.com',
    password: 'qwerty123'
  };

  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit('/');
  });

  it.skip('user should be allowed log in with valid creds', () => {
    cy.get('.nav-link').contains(user.username).should('be.visible');
  });

  it('user should be allowed to create an article', () => {
    cy.contains('.nav-link', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder(`What's this article about?`)
      .type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.findByPlaceholder('Enter tags').type('{enter}');
    cy.get('.btn').click();

    cy.url().should('contain', article.title);
    cy.get('h1').should('contain', article.title);

    cy.url().then((createdArticleUrl) => {
      articleUrl = createdArticleUrl;
    });
  });

  it('user should be allowed delete article', () => {
    cy.visit(articleUrl);
    cy.contains('.btn', 'Delete Article').click();
    cy.url().should('not.include', '/article');
  });
});
