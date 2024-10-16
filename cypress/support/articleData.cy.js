const { faker } = require('@faker-js/faker');

export const articleData = () => {
  return {
    title: faker.word.words(2),
    description: faker.word.words(4),
    body: faker.word.words(8),
    tags: faker.word.words(1)
  };
};
