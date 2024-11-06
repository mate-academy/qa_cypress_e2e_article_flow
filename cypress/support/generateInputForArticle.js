const { faker } = require('@faker-js/faker');

function generateInputForArticle() {
  const title = faker.commerce.product() + '123';
  const description = faker.commerce.productDescription() + '123';
  const body = faker.vehicle.model();

  return { title, description, body };
}

module.exports = { generateInputForArticle };
