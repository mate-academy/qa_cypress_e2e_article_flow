describe('Article Flow via API', () => {
  const uid = Date.now() + Math.floor(Math.random() * 1000);
  const email = `user${uid}@test.com`;
  const username = `user${uid}`;
  const password = 'Testpassword123!';

  const title = `Test Article ${uid}`;
  const description = 'About testing';
  const body = 'This is a test article created by Cypress';

  it('should create a new article', () => {
    cy.login(email, username, password).then(() => {
      cy.createArticle(title, description, body);

      cy.request('GET', 'https://conduit.mate.academy/api/articles?limit=10')
        .its('body.articles')
        .then((articles) => {
          const article = articles.find((a) => a.title === title);
          // eslint-disable-next-line no-unused-expressions
          expect(article).to.exist;
          expect(article.description).to.equal(description);
        });
    });
  });

  it('should delete the article', () => {
    cy.login(email, username, password).then(() => {
      cy.createArticle(title, description, body).then(() => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        const authToken = user.token;

        cy.request({
          method: 'GET',
          url: 'https://conduit.mate.academy/api/articles?limit=10',
          headers: {
            Authorization: `Token ${authToken}`
          }
        }).then((res) => {
          const slug = res.body.articles.find((a) => a.title === title).slug;

          cy.request({
            method: 'DELETE',
            url: `https://conduit.mate.academy/api/articles/${slug}`,
            headers: {
              Authorization: `Token ${authToken}`
            }
          }).then(() => {
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000);

            cy.request({
              url: `https://conduit.mate.academy/api/articles/${slug}`,
              failOnStatusCode: false
            }).then((res) => {
              expect(res.status).to.equal(404);
            });
          });
        });
      });
    });
  });
});
