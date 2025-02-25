const { faker } = require('@faker-js/faker');

export const generateUser = () => {
  const name = faker.internet.userName()
    .replace(/[^a-zA-Z0-9]/g, '').substring(0, 40);

  return {
    username: name,
    email: `${name}@gmail.com`,
    password: 'Test1234'
  };
};

export const generateeArticle = () => {
  return {
    title: faker.word.words(1),
    description: faker.word.words(5),
    body: faker.word.words(10),
    tag: faker.word.words(1)
  };
};
