const { generateUser } = require('./generateUser');

// describe('Conduit', () => {
//   let user;
//   const article = {
//     title: faker.lorem.word(),
//     about: faker.lorem.words(5),
//     content: faker.lorem.words(10),
//     tag: faker.lorem.word()
//   };

//   beforeEach(() => {
//     cy.visit('/');
//     cy.task('generateUser').then((generateUser) => {
//       user = generateUser;
//     });
//   });

//   it('should create a new article', () => {

//   });
// });

beforeEach(() => {
  cy.visit('/');
});

describe('Sign Up page', () => {
  it('should registe user', () => {
    cy.visit('/user/register');
    const { username, email, password } = generateUser();
    cy.visit('/user/register');
    cy.get('[placeholder=Username]')
      .type(username);
    cy.get('[placeholder=Email]')
      .type(email);
    cy.get('[placeholder=Password]')
      .type(password);
    cy.get('.btn').click();
  });
});
