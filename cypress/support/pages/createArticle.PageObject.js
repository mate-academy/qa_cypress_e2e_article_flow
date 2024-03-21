import { PageObject } from '../PageObject';

export class CreateNewArticle extends PageObject {
  url = '/editor';

  get titleField() {
    return cy.get('[placeholder="Article Title"]');
  };

  get descriptionField() {
    return cy.get('[placeholder^="What\'s this"]');
  };

  get articleBodyField() {
    return cy.get('[placeholder^="Write your article"]');
  };

  get publishArticleButton() {
    return cy.get('.btn').contains('Publish Article');
  };

  get createdArticleTitle() {
    return cy.get('h1');
  };

  get createdArticleBody() {
    return cy.get('.article-content');
  };

  assertNewArticleUrl(slug) {
    cy.url().should('include', `/article/${slug}`);
  };

  assertArticleTitleOnArticlePage(title) {
    this.createdArticleTitle.should('contain.text', title);
  };

  assertArticleBodyOnArticlePage(articleBody) {
    this.createdArticleBody.should('contain.text', articleBody);
  };
};
