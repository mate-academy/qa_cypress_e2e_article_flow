const { faker } = require('@faker-js/faker');

function generateData() {
  const title = faker.commerce.productName();
  const description = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(1);

  return { title, description, body };
}

module.exports = { generateData };
