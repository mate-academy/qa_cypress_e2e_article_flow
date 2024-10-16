describe('Article Flow with Pre-set Auth Token', () => {
  // eslint-disable-next-line max-len
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgxNTM0LCJ1c2VybmFtZSI6InRlc3R1c2VyNjAwNiIsImV4cCI6MTczNDI3MTc3MiwiaWF0IjoxNzI5MDg3NzcyfQ.i5DTxajO1KFWmD6UGuHp5hW6P4JhgyVM9OPFNG3d1kE';

  beforeEach(() => {
    cy.clearLocalStorage(); cy.clearCookies();

    cy.setCookie('auth', authToken);

    cy.getCookie('auth').should('have.property', 'value', authToken);
  });

  it('should create an article successfully', () => {
    const article = {
      title: 'Test Article Title',
      description: 'This is a test article description',
      body: 'This is the body of the test article',
      tagList: ['test', 'article']
    };
    cy.request({
      method: 'POST',
      url: '/api/articles',
      headers: {
        Authorization: `Token ${authToken}`
      },
      body: {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const articleSlug = response.body.article.slug;
      cy.visit('/');
      cy.contains(article.title).should('be.visible');
      cy.wrap(articleSlug).as('articleSlug');
    });
  });
});
