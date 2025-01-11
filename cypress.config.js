const { faker } = require('@faker-js/faker');
const { defineConfig } = require('cypress');

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
            title: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(2),
            tagList: Array.from({ length: 3 }, () => faker.lorem.word())
          };
        }
      });
    }
  }
});
