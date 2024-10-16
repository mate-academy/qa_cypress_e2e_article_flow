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
          const password = '12345Qwert!';
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
          const tagList = [faker.lorem.word()];
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
