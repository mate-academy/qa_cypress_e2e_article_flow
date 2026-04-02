const { faker } = require('@faker-js/faker');

function createUser() {
  const username = `A${faker.internet.userName()}`.replace(/[^a-zA-Z0-9]/g, '');
  const email = `${username}@gmail.com`;
  const password = 'Password2023!';

  return { email, username, password };
};

module.exports = { createUser };
