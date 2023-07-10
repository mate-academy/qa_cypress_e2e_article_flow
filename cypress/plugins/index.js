const { generateUser } = require('./cypress/e2e/article.cy.js');

module.exports = (on, config) => {
  on('task', {
    generateUser,
  });
};