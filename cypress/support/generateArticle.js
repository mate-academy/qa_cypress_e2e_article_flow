
function generateArticle() {
  const randomNumbers = Math.random().toString().slice(2, 6);
  const title = `Random article title ${randomNumbers}`;
  const description = 'Random article description';
  const body = 'This is a random article';
  const tag = 'example';

  return {
    title,
    description,
    body,
    tag
  };
};

module.exports = { generateArticle };
