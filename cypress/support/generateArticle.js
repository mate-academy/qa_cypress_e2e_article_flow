function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateArticle() {
  const title = generateRandomString(9);
  const desc = generateRandomString(19);
  const body = generateRandomString(99);
  const tag = generateRandomString(5);

  return { title, desc, body, tag };
}

module.exports = { generateArticle };
