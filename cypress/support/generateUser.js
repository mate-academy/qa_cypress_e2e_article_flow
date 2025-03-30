import { faker } from '@faker-js/faker';

function generateUser() {
  const randomNumber = Math.random().toString().slice(2, 6);
  const username = faker.lorem.word() + '_' + randomNumber;
  const email = `${username}@mail.com`;
  const password = '12345Qwert!';

  return { email, password, username };
}

module.exports = { generateUser };
