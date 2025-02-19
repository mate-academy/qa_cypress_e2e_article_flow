const { faker } = require('@faker-js/faker');

function generateArticleData () {
  const title = faker.lorem.word();
  const description = faker.lorem.words();
  const body = faker.lorem.paragraph();
  const tag = faker.lorem.word();

  return {
    title,
    description,
    body,
    tag
  };
};

module.exports = { generateArticleData };
