import { faker } from '@faker-js/faker';
import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get articleTitleField() {
    return cy.findByPlaceholder('Article Title');
  }

  get articleAboutField() {
    return cy.findByPlaceholder(`What's this article about?`);
  }

  get articleBodyField() {
    return cy.findByPlaceholder('Write your article (in markdown)');
  }

  get articleTagsField() {
    return cy.findByPlaceholder('Enter tags');
  }

  get submitButton() {
    return cy.get('.btn.btn-lg.btn-primary');
  }

  get deleteArticleButton() {
    return cy.get('.btn.btn-outline-danger').contains('Delete Article');
  }

  onClickSubmitArticle() {
    this.submitButton.click();
  }

  generateArticle() {
    return {
      title: faker.lorem.word(),
      description: faker.lorem.words(),
      body: faker.lorem.words(),
      tag: faker.lorem.word()
    };
  }

  createArticle(article) {
    const { title, description, tag, body } = article;

    this.articleTitleField.type(title);
    this.articleAboutField.type(description);
    this.articleBodyField.type(body);
    this.articleTagsField.type(`${tag}{Enter}`);
  }

  assertArticleTitle(title) {
    cy.contains(title).should('be.visible');
  }
};

export default ArticlePageObject;
