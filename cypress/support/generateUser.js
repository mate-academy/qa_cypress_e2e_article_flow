const faker = require('faker');

function generateUser() {
  return {
    username: faker.name.firstName() + faker.name.lastName() + faker.random.number(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

module.exports = { generateUser };
