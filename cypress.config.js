const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random(100) * 100);
          const gender = faker.helpers.arrayElement(['male', 'female']);

          const username = faker.person.firstName(
            { sex: gender.toLowerCase() }
          ) + randomNumber;

          const firstName = faker.person.firstName(
            { sex: gender.toLowerCase() }
          );
          const lastName = faker.person.lastName({ sex: gender.toLowerCase() });
          const domain = faker.internet.domainWord();
          const topDomain = faker.internet.domainSuffix();
          const email = `${firstName}.${lastName}${randomNumber}@${domain}.${topDomain}`;

          return {
            username,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },

        articleForm() {
          const title = faker.lorem.slug({ min: 1, max: 3 });
          const description = faker.lorem.sentences({ min: 1, max: 2 });
          const body = faker.lorem.paragraphs({ min: 5, max: 15 });
          const tags = `#${faker.lorem.word({ length: { min: 3, max: 10 } })}`;

          return {
            title,
            description,
            body,
            tags
          };
        }
      });
    }
  }
});
