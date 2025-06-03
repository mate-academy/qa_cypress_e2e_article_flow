/* eslint-disable */
/// <reference types='cypress' />

import { faker } from '@faker-js/faker';

describe("Article Management", () => {
  const uniqueTitle = faker.lorem.words(3);
  const uniqueDescription = faker.lorem.sentence();
  const uniqueBody = faker.lorem.paragraph();
  
  before(() => {
    cy.login("testuser", "TestPassword123"); // 🔹 Use login command
  });

  it("should create an article successfully", () => {
    cy.createArticle(uniqueTitle, uniqueDescription, uniqueBody);

    // 🔹 Assert the article was created
    cy.contains(".article-title", uniqueTitle).should("be.visible");
    cy.contains(".article-body", uniqueBody).should("be.visible");
  });

  it("should delete an article successfully", () => {
    cy.createArticle(uniqueTitle, uniqueDescription, uniqueBody); // 🔹 Create before deleting

    // 🔹 Navigate to the article and delete it
    cy.contains(".article-title", uniqueTitle).click();
    cy.get(".delete-article-button").click();

    // 🔹 Assert the article was deleted
    cy.contains(".article-title", uniqueTitle).should("not.exist");
  });
});

