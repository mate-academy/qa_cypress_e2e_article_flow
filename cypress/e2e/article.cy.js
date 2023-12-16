/// <reference types="cypress" />

let user;
let article;

describe('article', () => {
  beforeEach(() => {
    cy.visit('user/register');
    cy.task('generateUser').then((newUser) => {
      user = newUser;
    });
    cy.task('generateArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');
    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('[type="button"]').contains('Publish Article').click();
    cy.get('.nav-link').contains(user.username).click();
    cy.get('h1').contains(article.title).should('be.visible');
  });

  it('should delete the created article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((resp) => {
        cy.getCookie('auth').then((token) => {
          const authToken = token.value;

          cy.request({
            method: 'DELETE',
            url: `/api/articles/${resp.body.article.slug}`,
            body: {
              article: {
                title: resp.body.article.title,
                description: resp.body.article.description,
                body: resp.body.article.body,
                tagList: []
              }
            },
            headers: {
              Authorization: `Token ${authToken}`
            }
          });
        });
      }).then((article) => {
        cy.get(article).should('not.be.visible');
      });
  });
});
