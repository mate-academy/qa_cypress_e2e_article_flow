import { faker } from '@faker-js/faker';

export function generateRandomArticle() {
  const title = faker.word.words(3);
  const description = faker.word.words({ count: { min: 10, max: 20 } });
  const body = faker.word.words({ count: { min: 300, max: 500 } });

  return { title, description, body };
}
