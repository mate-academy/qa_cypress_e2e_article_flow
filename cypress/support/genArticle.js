const faker = require('faker');

function generateAticle() {
  const title = faker.internet.userName();
  const description = faker.internet.userName();
  const body = faker.internet.userName();
 

  return {title, description, body}
}
module.exports = { generateAticle }