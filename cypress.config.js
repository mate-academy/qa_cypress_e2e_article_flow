const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const uniqueId = faker.string.uuid();

          return {
            username: `qa_${uniqueId.replace(/-/g, '').slice(0, 16)}`,
            email: `qa_${uniqueId}@example.com`,
            password: '12345Qwert!'
          };
        }
      });
    }
  }
});
