interface Chainable {
  login: (email: string, username: string, password: string) => Chainable<any>
  createArticle: (title: string, description: string, body: string)
  => Chainable<any>
}
