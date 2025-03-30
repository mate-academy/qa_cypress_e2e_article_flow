import { faker } from '@faker-js/faker';

function generate() {
  function userGeneration() {
    const userGen = {
      email:
      faker.internet.email().toLowerCase(),
      username:
      faker.internet.userName().toLowerCase().split('.').join(''),
      password:
      faker.internet.password().toLowerCase()
    };

    return userGen;
  }

  function articleGeneration() {
    function generateTitle(maxWords = 5) {
      const targetWords = Math.floor(Math.random() * maxWords) + 1;
      let words = [];

      while (words.length < targetWords) {
        const sentence = faker.lorem.sentence();
        const sentenceWords = sentence.split(' ');

        if (words.length + sentenceWords.length > targetWords) {
          const remainingWords = targetWords - words.length;
          words = words.concat(sentenceWords.slice(0, remainingWords));
          break;
        } else {
          words = words.concat(sentenceWords);
        }
      }

      return words.join(' ');
    }

    function generateTheme(maxWords = 20) {
      const targetWords = Math.floor(Math.random() * maxWords) + 1;
      let words = [];

      while (words.length < targetWords) {
        const sentence = faker.lorem.sentence();
        const sentenceWords = sentence.split(' ');

        if (words.length + sentenceWords.length > targetWords) {
          const remainingWords = targetWords - words.length;
          words = words.concat(sentenceWords.slice(0, remainingWords));
          break;
        } else {
          words = words.concat(sentenceWords);
        }
      }

      return words.join(' ');
    }

    function generateBody(maxWords = 100) {
      const targetWords = Math.floor(Math.random() * maxWords) + 1;
      let words = [];

      while (words.length < targetWords) {
        const sentence = faker.lorem.sentence();
        const sentenceWords = sentence.split(' ');

        if (words.length + sentenceWords.length > targetWords) {
          const remainingWords = targetWords - words.length;
          words = words.concat(sentenceWords.slice(0, remainingWords));
          break;
        } else {
          words = words.concat(sentenceWords);
        }
      }

      return words.join(' ');
    }

    function generateTags(maxWords = 5) {
      const targetWords = Math.floor(Math.random() * maxWords) + 1;
      let words = [];

      while (words.length < targetWords) {
        const sentence = faker.lorem.sentence();
        const sentenceWords = sentence.split(' ');

        if (words.length + sentenceWords.length > targetWords) {
          const remainingWords = targetWords - words.length;
          words = words.concat(sentenceWords.slice(0, remainingWords));
          break;
        } else {
          words = words.concat(sentenceWords);
        }
      }

      return words.join('{enter}') + '{enter}';
    }

    const fullArticle = {
      articleTitle: generateTitle(),
      articleTheme: generateTheme(),
      articleBody: generateBody(),
      articleTags: generateTags()
    };

    return fullArticle;
  }

  const generated = {
    user: userGeneration(),
    article: articleGeneration()
  };

  return generated;
}

module.exports = { generate };
