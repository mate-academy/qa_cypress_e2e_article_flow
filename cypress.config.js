const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const username = faker.person.name();
          const email = faker.internet.email().toLowerCase();
          const password = faker.internet.password();
          return {
            username,
            email,
            password
          };
        },
        generateDataForArticle() {
          const title = faker.lorem.words(3);
          const description = faker.lorem.sentence();
          const body = faker.lorem.paragraph();
          const tagList = [faker.lorem.words({ min: 1, max: 4 })];
          return {
            title,
            description,
            body,
            tagList
          };
        }
      });
    }
  }
});
