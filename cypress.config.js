const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            username: faker.name.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.word(),
            body: faker.lorem.words(),
            tags: faker.lorem.word()
          };
        }
      });
    }
  }
});
