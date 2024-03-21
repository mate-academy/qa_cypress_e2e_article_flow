import { PageObject } from '../PageObject';

export class DeleteArticle extends PageObject {
  get deleteArticleButton() {
    return cy.contains('Delete Article');
  };

  get articlePreview() {
    return cy.get('.article-preview');
  }

  assertUrlAfterDeletingArticle() {
    cy.url().should('eq', 'https://conduit.mate.academy/');
  };

  assertArticlePreviewMessageIsExist() {
    this.articlePreview.should('contain.text', 'No articles are here... yet.');
  };
};
