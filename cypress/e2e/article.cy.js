/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import { generateArticle } from "../support/generateArticle";

describe('Conduit', () => {
  const article = generateArticle();
  let articleUrl;
  const user = {
    name: 'qamay2024',
    email: 'qamay2024@gmail.com',
    password: '1234567890'
  };
  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit('/');
  });

  it('should login user with valid credentials', () => {
    // cy.visit('user/login')
    // cy.findByPlaceholder('Email').type(user.email);
    // cy.findByPlaceholder('Password').type(user.password);
    // cy.contains('[type="submit"]', 'Sign in').click();
    // cy.get('.btn').contains('Sign in').click();
    cy.get('.nav-link').contains(user.name)
    .should('be.visible');
  });
  it('should allow user article creation', () => {
    cy.contains('.nav-link', 'New Article').click();
    cy.findByPlaceholder('Article Title').type(article.title);
    cy.findByPlaceholder('What\'s this article about?')
    .type(article.description);
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
    cy.visit(articleUrl);
    cy.contains('.btn', 'Delete Article').click();
    cy.url().should('not.include', '/article');
  });
});
