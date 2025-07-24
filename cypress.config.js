const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker'); // Імпортуємо faker для використання в тасці

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random() * 10000);
          const username = faker.internet.userName().replace(/[^a-zA-Z0-9]/g, '') + randomNumber;
          const finalUsername = username.match(/^[a-zA-Z]/) ? username : `user${username}`;
          const trimmedUsername = finalUsername.substring(0, 40);

          return {
            username: trimmedUsername,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        }
      });
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  },
  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  defaultCommandTimeout: 4000,
  viewportWidth: 1280,
  viewportHeight: 720
});
