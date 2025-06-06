const { faker } = require('@faker-js/faker');

function generateArticle() {
  const title = faker.lorem.word();
  const description = faker.lorem.sentences();
  const body = faker.lorem.text();
  return { title, description, body };
}

module.exports = { generateArticle };
