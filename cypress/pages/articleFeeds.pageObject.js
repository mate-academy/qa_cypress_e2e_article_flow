export default class ArticleFeedsPageObject {
  verifyYourFeedTab() {
    cy.get('.nav-link').contains('Your Feed').should('have.class', 'active');
  }

  verifyNoArticlesMessage() {
    cy.get('.article-preview').should(
      'contain.text',
      'No articles are here... yet.'
    );
  }
};
