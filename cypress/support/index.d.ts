/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    login(
      userData: Object
    ): Chainable<any>
    createArticle(
      title: string,
      description: string,
      body: string,
      tags: string
    ): Chainable<any>
    deleteArticle(
      authToken: string,
      slug: string
    ): Chainable<any>
  }
};
