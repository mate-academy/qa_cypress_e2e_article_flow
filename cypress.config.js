const { defineConfig } = require('cypress');
const faker = require('@faker-js/faker').faker;

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
            password: faker.internet.password()
          };
        },
        generateArticle() {
          return {
            title: faker.word.verb(),
            description: faker.word.words(),
            body: faker.lorem.paragraph(10)
          };
        }
      });
    }
  }
});
