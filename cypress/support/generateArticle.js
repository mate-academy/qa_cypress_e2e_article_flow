const generateArticle = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  const title = `max-power${randomNumber}`;
  const description = `${title}#####################`;
  const body = '###################';

  return { title, description, body};
};

module.exports = { generateArticle };
