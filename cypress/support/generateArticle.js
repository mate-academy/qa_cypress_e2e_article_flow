import { faker } from '@faker-js/faker';

function generateArticle() {
  const randomNumber = Math.random().toString().slice(2, 6);
  return {
    title: faker.lorem.word() + randomNumber,
    description: faker.lorem.words(),
    body: faker.lorem.words(),
    tags: faker.lorem.word()
  };
}

module.exports = { generateArticle };
