const { faker } = require('@faker-js/faker');

const generateUser = () => {
  const randomNumber = faker.number.int({ min: 1000, max: 9999 });
  const username = faker.person.firstName() + String(randomNumber);
  const email = username + '@gmail.com';
  const password = '12345Qwert!';

  return {
    username,
    email,
    password
  };
};

module.exports = {
  generateUser
};
