const { defineConfig } = require('cypress');
// const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  viewportWidth: 2000,
  viewportHeight: 1000,
  e2e: {
    baseUrl: 'https://conduit.mate.academy',
    setupNodeEvents(on, config) {
      on('task', {
      });
    }
  }
});
