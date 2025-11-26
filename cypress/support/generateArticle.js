const { faker } = require('@faker-js/faker');
function generateArticle() {
  const title = faker.lorem.words({ min: 1, max: 2 });
  const description = faker.lorem.words({ min: 3, max: 5 });
  const body = faker.lorem.words({ min: 6, max: 10 });

  return { title, description, body };
}

module.exports = { generateArticle };
