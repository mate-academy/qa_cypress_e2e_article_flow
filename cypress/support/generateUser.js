const { faker } = require('@faker-js/faker');

function generateUser() {
  const randomNumber = Math.floor(Math.random() * 1000);
  const username = faker.name.firstName() + randomNumber;
  const email = faker.internet.email();
  const password = 'Test123';

  return { username, email, password };
}

module.exports = { generateUser };
