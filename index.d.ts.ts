declare namespace Cypress {
    interface Chainable<Subject> {
      login(username: string, password: string): Chainable<any>
      findByPlaceholder(placeholder: string): Chainable<any>
    }
  }