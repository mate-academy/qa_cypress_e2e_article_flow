export class ArticlePage {
  get titleField() {
    return cy.get('[placeholder="Article Title"]');
  }

  get descriptionField() {
    return cy.get('[placeholder="What\'s this article about?"]');
  }

  get bodyField() {
    return cy.get('[placeholder="Write your article (in markdown)"]');
  }

  get publishArticleButton() {
    return cy.get('.btn');
  }

  createArticle(article) {
    this.titleField.type(article.title);
    this.descriptionField.type(article.description);
    this.bodyField.type(article.body);
    this.publishArticleButton.click();
  }

  assertArticleCreation(article) {
    cy.get('[class="row article-content"]')
      .should('contain.text', article.body);
  }
}
