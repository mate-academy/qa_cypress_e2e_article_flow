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
            name: faker.name.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        }
      });

      on('task', {
        generateArticle() {
          return {
            title: faker.lorem.words(),
            body: faker.lorem.words(),
            description: faker.lorem.words()
          };
        }
      });
    }
  }
});
