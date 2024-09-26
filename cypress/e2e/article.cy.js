import { generateArticle } from '../support/generateArticle';
import { generateUser } from '../support/generateUser';

describe('Conduit Article', () => {
  const article = generateArticle();
  const user = generateUser();
  const deleteButton = '.article-actions > .article-meta > :nth-child(3)';
  before(() => {
    cy.visit('/');
  });

  it('should provide an ability to create article', () => {
    cy.intercept('GET', '/api/articles/*').as('getArticle');
    cy.register(user.username, user.email, user.password);
    cy.reload();
    cy.contains('.nav-link', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?').type(article.desc);
    cy.findByPlaceholder('Write your article').type(article.body);

    cy.contains('[type=button]', 'Publish Article').click();
    cy.wait('@getArticle');
    cy.get('.article-page').should('contain', article.body);
    cy.get('.banner').should('contain', article.title);

    cy.contains('.nav-link', user.username.toLowerCase()).click();
    cy.contains('.preview-link', `Article title: ${article.title}`).click();
    cy.get(deleteButton).click();
    cy.wait('@getArticle');
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.contains('.nav-link', user.username.toLowerCase()).click();
  });

  it('should provide an ability to delete article', () => {
    cy.intercept('GET', '/api/articles/*').as('getArticle');
    cy.login(user.email, user.password);
    cy.createArticle(article.title, article.desc, article.body);
    cy.reload();
    cy.visit('/');
    cy.wait('@getArticle');
    cy.contains('.nav-link', user.username.toLowerCase()).click();

    cy.contains('.preview-link', `Article title: ${article.title}`).click();
    cy.get(deleteButton).click();

    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.contains('.nav-link', user.username.toLowerCase()).click();
  });
});
