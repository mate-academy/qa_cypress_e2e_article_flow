const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          const newUsername = faker.person.firstName() + randomNumber;
          const newEmail = newUsername + '@qa.com';
          const newPassword = newUsername;
          return {
            email: newEmail,
            username: newUsername,
            password: newPassword
          };
        }
      });
      on('task', {
        generateArticle() {
          const randomNumber = Math.floor(Math.random(1000) * 1000);
          const newTitle = faker.lorem.words(3) + randomNumber;
          const newDescription = faker.lorem.words(10) + randomNumber;
          const newBody = faker.lorem.words(30);
          return {
            title: newTitle,
            description: newDescription,
            body: newBody
          };
        }
      });
    }
  }
});
