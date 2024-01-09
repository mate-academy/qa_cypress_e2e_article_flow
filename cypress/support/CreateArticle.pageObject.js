import { PageObject } from './PageObject';

export class CreateArticlePageObject extends PageObject {
  url = '/editor';

  get titleField() {
    return cy.findByPlaceholder('Article Title');
  }

  get descriptionField() {
    return cy.findByPlaceholder('What\'s this article about?');
  }

  get bodyField() {
    return cy.findByPlaceholder('Write your article (in markdown)');
  }

  get tagsField() {
    return cy.findByPlaceholder('Enter tags');
  }

  get PublishArticle() {
    // eslint-disable-next-line cypress/no-force
    return cy.contains('[type="button"]', 'Publish Article')
      .click({ force: true });
  }

  clickPublishArticle() {
    this.PublishArticle.click();
  }
};
