/// <reference types="cypress" />
import { ar } from "@faker-js/faker";
import { createArticle } from "../support/createArticle";

describe('Conduit', () => {
  const article = createArticle();
  let articleUrl;
  const user = {
    name: 'te1',
    email: 'test9912@gmail.com',
    password: '1234',
  };

  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit('/');
  });

  it('should allow user article creation', () => {
    cy.contains('.nav-link', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?').type(article.description);
    cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
    cy.findByPlaceholder('Enter tags').type(article.tag);
    cy.findByPlaceholder('Enter tags').type('{enter}');
    cy.get('.btn').click();

    cy.url().should('contain', article.title);
    cy.get('h1').should('contain', article.title);
    cy.url().then(createdArticleUrl => {
      articleUrl = createdArticleUrl;
    });
});

  it('should allow deleting created user article', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag)
    cy.visit(articleUrl);
    cy.contains('.btn', 'Delete Article').click();
    cy.url().should('not.include', '/article'); 
  });
});
