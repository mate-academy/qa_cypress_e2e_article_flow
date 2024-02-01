describe('', () => {
  before(() => {
    describe('Article page', () => {
      let user;
      let article;

      beforeEach(() => {
        cy.task('generateUser').then((generateUser) => {
          user = generateUser;
        });
        cy.task('generateArticle').then((generateArticle) => {
          article = generateArticle;
        });
      });

      it('', () => {
        it('should allow to create an article', () => {
          cy.login(user.email, user.username, user.password);
          cy.visit('/editor');
          cy.get('[placeholder="Article Title"]').type(article.title);
          cy.get('[placeholder="What\'s this article about?"]')
            .type(article.description);
          cy.get('[placeholder="Write your article (in markdown)"]')
            .type(article.body);
          cy.contains('[type="button"]', 'Publish Article').click();
          cy.get('[class="row article-content"]').should('contain',
            article.body);
          cy.get('[class="banner"]').should('contain', article.title);
          cy.get('.btn').contains('Edit Article').should('be.visible');
          cy.get('.btn').contains('Delete Article').should('be.visible');
        });

        it('', () => {
          it('should allow to delete an article', () => {
            cy.login(user.email, user.username, user.password);
            cy.createArticle(article.title, article.description, article.body)
              .then((response) => {
                const slug = response.body.article.slug;

                cy.visit(`/article/${slug}`);
              });
            cy.get('.btn').contains('Delete Article').click();
            cy.on('window:confirm', (confirm) => {
              expect(confirm).to.equal(`Do you really want to delete it?`);
            });
            cy.on('window:confirm', () => true);
            cy.get('[alt="your profile image"]').click();
            cy.get('[class="article-preview"]')
              .should('contain', 'No articles are here... yet.');
          });
        });
      });
    });
  });
});
