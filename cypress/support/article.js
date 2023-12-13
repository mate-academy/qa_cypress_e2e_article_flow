module.exports = { article };

const { faker } = require('@faker-js/faker');

function article() {
  const title = faker.lorem.words(2);
  const description = faker.lorem.words(5);
  const body = faker.lorem.words(20);
  return { title, description, body };
};
