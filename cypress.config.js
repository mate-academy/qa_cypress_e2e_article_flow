const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.exampleEmail();
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          return {
            username: faker.person.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        }
      });

      on('task', {
        generateArticle() {
          const title = faker.lorem.words();
          const description = faker.lorem.sentence();
          const body = faker.lorem.sentences();

          return {
            title,
            description,
            body
          };
        }
      });
    }
  }
});
