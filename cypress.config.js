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
            username: faker.name.firstName() + randomNumber,
            username: faker.person.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        }
      });
      on('task', {
        generateArticle() {
          const randomNumber = Math.floor(Math.random() * 1000);
          return {
            title: faker.lorem.word() + randomNumber,
            description: faker.lorem.words(),
            body: faker.lorem.word(),
            tag: faker.lorem.word()
          };
        }
      });
    }
  }
});
