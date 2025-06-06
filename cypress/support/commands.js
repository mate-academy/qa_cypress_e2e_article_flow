Cypress.Commands.add('createArticle', (title, description, body) => {
  cy.getCookie('auth').should('exist').then((cookie) => {
    const token = cookie.value;

    cy.request({
      method: 'POST',
      url: 'https://conduit.mate.academy/api/articles',
      headers: {
        Authorization: `Token ${token}`
      },
      body: {
        article: {
          title,
          description,
          body,
          tagList: [] // 🔑 ключ до перемоги
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
