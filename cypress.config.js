const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            username: faker.person.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          const random = Math.floor(Math.random() * 1000000);
          return {
            title: `Title ${random}`,
            description: `Description ${random}`,
            body: `This is the body of article ${random}`,
            tags: [`tag${random}`, `tag${random + 1}`]
          };
        }
      });
    }
  }
});
