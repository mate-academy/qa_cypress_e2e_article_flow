/* eslint-disable */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 780,
    viewportWidth: 1020,
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        newArticle() {
          return {
            title: '123',
            description: '123',
            body: '123',
            tag: '123'
          };
        }
      });
    }
  }
});
