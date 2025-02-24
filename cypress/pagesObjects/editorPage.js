/// <reference types='cypress' />

export default class EditorPage {
  get editorPageUrl() {
    return 'editor';
  }

  get articleTitleFirld() {
    return cy.get('[placeholder="Article Title"]');
  }

  fillTitleField(articleTitle) {
    this.articleTitleFirld
      .type(articleTitle);
  }

  get aboutField() {
    return cy.get('[placeholder="What\'s this article about?"]');
  }

  fillAboutField(about) {
    this.aboutField.type(about);
  }

  get articleContentField() {
    return cy.get('[placeholder="Write your article (in markdown)"]');
  }

  fillArticleContentField(content) {
    this.articleContentField.type(content);
  }

  get articleTagsField() {
    return cy.get('[placeholder="Enter tags"]');
  }

  fillTagsField(tags) {
    for (const tag of tags) {
      this.articleTagsField.type(`${tag}{Enter}`);
    }
  }

  get publishArticleBtn() {
    return cy.contains('button.btn-primary', 'Publish');
  }

  publishArticle() {
    this.publishArticleBtn.click();
  }
}
