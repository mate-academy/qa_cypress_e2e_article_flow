const { defineConfig } = require("cypress");
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const firstName = faker.name.firstName();
          const lastName = faker.name.lastName();
          const randomNumber = Math.floor(Math.random() * 10000);
          return {
            username: `${firstName}${lastName}${randomNumber}`,
            email: faker.internet.email(
              firstName,
              lastName,
              'example.com'
            ).toLowerCase(),
            password: 'P@ssw0rd123!'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            body: faker.lorem.paragraphs(3)
          };
        }
      });
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});
