/// <reference types="cypress" />

const { faker } = require('@faker-js/faker');

describe('article', () => {
  beforeEach(() => {
    cy.visit('user/register');
  });

  it('should create an article', () => {
    const randomNumber = Math.random().toString().slice(2, 10);
    const user = {
      username: faker.lorem.word() + randomNumber,
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    const article = {
      title: faker.lorem.word(),
      description: faker.lorem.words(3),
      body: faker.lorem.words(10)
    };
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .as('article');
    cy.get('@article').should((resp) => {
      expect(resp.status).to.eq(200);
    });
  });

  it('should delete the created article', () => {
    const randomNumber = Math.random().toString().slice(2, 10);
    const user = {
      username: faker.lorem.word() + randomNumber,
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    const article = {
      title: faker.lorem.word(),
      description: faker.lorem.words(3),
      body: faker.lorem.words(10)
    };
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
      }).as('delete');
    cy.get('@delete').should((resp) => {
      expect(resp.status).to.eq(204);
    });
  });
});
