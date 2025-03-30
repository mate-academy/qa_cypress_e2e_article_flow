import ArticlePageObject from '../support/pages/article.pageObject';

const ArticlePage = new ArticlePageObject();

describe('Article', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
      cy.visit('/editor');
    });
  });

  it('should fill in article and create it', () => {
    const article = ArticlePage.generateArticle();
    ArticlePage.createArticle(article);
    ArticlePage.onClickSubmitArticle();
    ArticlePage.assertArticleTitle(article.title);
  });

  it('should be able to delete an article', () => {
    const article = ArticlePage.generateArticle();
    cy.createArticle(article).then((response) => {
      cy.visit(`/article/${response.body.article.slug}`);
      ArticlePage.assertArticleTitle(article.title);
      cy.get('.btn.btn-outline-danger.btn-sm').eq(0).click();
      cy.assertPageURL('/');
    });
  });
});
