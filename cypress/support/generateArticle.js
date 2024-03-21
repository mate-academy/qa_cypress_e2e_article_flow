const faker = require('faker');

function generateArticle() {
  return {
    title: faker.lorem.word(),
    description: faker.lorem.words(),
    body: faker.lorem.paragraph()
  };
}

module.exports = { generateArticle };
