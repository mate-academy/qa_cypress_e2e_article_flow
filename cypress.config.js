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
          return {
            title: faker.lorem.lines(1),
            about: faker.lorem.lines({ min: 1, max: 2 }),
            content: faker.lorem.paragraphs(5, '\n'),
            tags: [faker.word.noun(), faker.word.noun(), faker.word.noun()]
          };
        }
      });
    }
  }
});
