/// <reference types="cypress" />

describe('Article flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((user) => {
      cy.wrap(user).as('user').then((a) => {
        cy.login(a.email, a.username, a.password);
      });
    });
    cy.visit('/');
  });

  it('should assert create an article', () => {
    cy.get('@user').then((a) => {
      cy.fixture('article.json').then((article) => {
        const title = article.title + Math.random().toString().slice(2, 5);
        const description = article.description + Math.random()
          .toString().slice(2, 8);
        const body = article.body + Math.random().toString().slice(2, 12);

        cy.get('a[href="/editor"]')
          .click();

        cy.get('[placeholder="Article Title"]')
          .type(title);

        cy.get(`[placeholder="What's this article about?"]`)
          .type(description);

        cy.get('[placeholder="Write your article (in markdown)"]')
          .type(body);

        cy.get('[class="btn btn-lg pull-xs-right btn-primary"]')
          .click();

        cy.contains('h1', title)
          .should('exist');

        cy.contains('p', body)
          .should('exist');

        const name = a.username.toLowerCase();
        cy.contains('.nav-link', name)
          .click();

        cy.contains('p', description)
          .should('exist');
      });
    });
  });

  it('should assert delete an article', () => {
    cy.get('@user').then((a) => {
      cy.fixture('article.json').then((article) => {
        const title = article.title + Math.random().toString().slice(2, 5);
        const description = article.description + Math.random()
          .toString().slice(2, 8);
        const body = article.body + Math.random().toString().slice(2, 12);
        cy.createArticle(title, description, body).then((response) => {
          const slug = response.body.article.slug;
          cy.visit(`/article/${slug}`);

          cy.contains('h1', title)
            .should('exist');

          cy.contains('p', body)
            .should('exist');

          const name = a.username.toLowerCase();
          cy.contains('.nav-link', name)
            .click();

          cy.contains('p', description)
            .should('exist');

          cy.visit(`/article/${slug}`);

          cy.contains('button', 'Delete Article')
            .click();

          cy.url().should('eq', Cypress.config().baseUrl + '');
        });
      });
    });
  });
});
