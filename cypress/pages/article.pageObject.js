/* eslint-disable */

export default class ArticlePageObject {
  verifyArticleHeader(title) {
    return cy.get('.article-page h1').should('contain.text', title);
  }

  verifyArticleBody(content) {
    return cy.get('.article-content p').should('contain.text', content);
  }

  clickDeleteArticleButton() {
    return cy
      .get('.article-page button.btn-outline-danger')
      .contains('Delete Article')
      .click();
  }
}
