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
          const username = faker.person.firstName() + randomNumber;
          return {
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: '12345Qwert!'
          };
        },
        newArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tagList: faker.lorem.word()
          };
        }
      });
    }
  }
});
