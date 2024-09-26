function generateUser() {
    function generateRandomString(length) {
      const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += char.charAt(Math.floor(Math.random() * char.length));
      }
      return result;
    }
    const randomNumber = Math.round(Math.random(1000) * 1000);
    const username = `${generateRandomString(6)}${randomNumber}`;
    const email = `${username}@mail.com`;
    const password = '12345Qwert!';
  
    return { username, email, password };
  }
  
  module.exports = { generateUser };