import { faker } from '@faker-js/faker';

export default function generateUser() {
  const email = faker.internet.email();
  const randomNumber = Math.floor(Math.random() * 1000);
  return {
    username: faker.person.firstName() + randomNumber,
    email: email.toLowerCase(),
    password: '12345Qwert!'
  };
};
