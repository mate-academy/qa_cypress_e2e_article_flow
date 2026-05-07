// customComand
class ArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ArgumentError';
  }
}

class StructureError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ArgumenError';
  }
}
/**
 *
 * @param {object} objPattern
 * @param {object} objToTest
 * @param {boolean} onlyStructure
 * @param {boolean} printOnConsole
 * @returns {boolean}
 */
function isTheSameStructureOfObj(
  objPattern,
  objToTest,
  onlyStructure = false,
  printOnConsole = false,
  useSpecialSyntax = false
) {
  function transformSyntax(syntax) {
    switch (syntax) {
      case '[object String]':
        return '@string';
      case '[object Undefined]':
        return '@undefined';
      case '[object Null]':
        return '@null';
      case '[object Number]':
        return '@number';
      case '[object BigInt]':
        return '@bigInt';
      case '[object Boolean]':
        return '@boolean';
    }
  }
  function walkThroughObj(pattern, test) {
    const actualPropertyType = Object.prototype.toString.call(pattern);
    const actualPropertyTypeOfTest = Object.prototype.toString.call(test);
    const isPrimitiveLikeValue = () => {
      return !(actualPropertyType === '[object Object]' ||
        actualPropertyType === '[object Array]');
    };
    let doesSkipDueToSyntax = false;

    if ((actualPropertyType === '[object String]') && (useSpecialSyntax) &&
      (pattern.includes('@', 0))) {
      const allSpecialSyntax = pattern
        .match(/@([aA]ll|[sS]tring|[uU]ndefined|[bB]oolean|[nN]umber|[nN]ull|[bB]igInt)/g)
        ?.map((syntax) => syntax.at(0).toLowerCase() + syntax.slice(1));
      const transformatedDataType = transformSyntax(actualPropertyTypeOfTest);

      doesSkipDueToSyntax = (allSpecialSyntax)
        ? allSpecialSyntax.some((syntax) => syntax === transformatedDataType ||
        syntax === '@all')
        : false;
    }

    if ((!doesSkipDueToSyntax) &&
      (actualPropertyType !== actualPropertyTypeOfTest)) {
      throw new Error(`"ObjToTest" has different structure than "objPattern" (Correct: ${actualPropertyType} Inncorrect: ${actualPropertyTypeOfTest})`);
    } else if ((actualPropertyType === '[object Object]' ||
          actualPropertyType === '[object Array]') && !onlyStructure) { // jeśli testowanie ma być dokładne
      const keysFromPattern = Object.keys(pattern);
      const keysFromTest = Object.keys(test);
      const hasDifferentLength = keysFromPattern.length !== keysFromTest.length;

      if (hasDifferentLength) {
        throw new StructureError(`"ObjToTest" has different structure than "objPattern" (Amount of Properties)`);
      }

      keysFromPattern.forEach((keyPattern, i) => {
        if (keyPattern !== keysFromTest[i]) {
          throw new StructureError(`"ObjToTest" has at least one different name of key from "objPattern" (Correct: ${keyPattern} Incorrect: ${keysFromTest[i]})`);
        }
      });
    } else if ((actualPropertyType === '[object Object]' || // jeśli testowana ma być tylko struktura
          actualPropertyType === '[object Array]') && onlyStructure) {
      const hasDifferentLength =
        Object.keys(pattern).length !== Object.keys(test).length;

      if (hasDifferentLength) {
        throw new StructureError('"ObjToTest" has different structure than' +
          '"objPattern" (Amount of Properties)');
      }
    }

    switch (true) { // reakcja w zależności od typu danych
      case isPrimitiveLikeValue():

        if (doesSkipDueToSyntax) {
          return;
        }

        if ((!onlyStructure) && (pattern !== test)) {
          throw new Error(`"ObjToTest" has at least one different value of key from "objPattern" (Correct: ${pattern} Incorrect: ${test})`);
        }
        return;
      case actualPropertyType === '[object Object]':
        for (let i = 0; i < Object.values(pattern).length; i++) {
          const actualPropertyOfPattern = Object.values(pattern)[i];
          const actualPropertyOfTest = Object.values(test)[i];

          walkThroughObj(actualPropertyOfPattern, actualPropertyOfTest);
        }

        return;
      case actualPropertyType === '[object Array]':
        for (let i = 0; i < pattern.length; i++) {
          const actualElementOfPattern = pattern[i];
          const actualElementOfTest = test[i];

          walkThroughObj(actualElementOfPattern, actualElementOfTest);
        }
    }
  }

  const arg1Type = typeof objPattern;
  const arg2Type = typeof objToTest;
  const arg3Type = typeof onlyStructure;
  const arg4Type = typeof printOnConsole;
  const arg5Type = typeof useSpecialSyntax;

  switch (true) {
    case objPattern === null:
      throw new ArgumentError('"objPattern cannot be null"');
    case arg1Type !== 'object':
      throw new ArgumentError('"objPattern" cannot be primitive type');
    case objToTest === null:
      throw new ArgumentError('"ObjToTest cannot be null"');
    case arg2Type !== 'object':
      throw new ArgumentError('"objToTest cannot be primitive type"');
    case arg3Type !== 'boolean':
      throw new ArgumentError('"onlyStructure" must be Boolean');
    case arg4Type !== 'boolean':
      throw new ArgumentError('"printOnConsole" must be Boolean');
    case arg5Type !== 'boolean':
      throw new ArgumentError('"useSpecialSyntax" must be Boolean');
  }

  try {
    walkThroughObj(objPattern, objToTest);
  } catch (error) {
    if (printOnConsole) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return false;
  }

  return true;
}
/**
 *
 * @param {string} string
 * @returns {string}
 */
function randomize(string) {
  if (typeof string !== 'string') {
    throw new Error('"string" must be String');
  }

  const letterBase = string.split('');
  const repeatLimit = string.length;
  let randomizedString = '';

  for (let i = 0, maxRandom = repeatLimit; i < repeatLimit; i++, maxRandom--) {
    const randomIndex = Math.floor(Math.random() * maxRandom);

    randomizedString += letterBase.splice(randomIndex, 1);
  }

  return randomizedString;
}
/**
 *
 * @param {string} stringToTransform
 * @param {object: } requirements
 * @returns {string}
 */
function stringTransformator(
  stringToTransform,
  requirements = {
    spaceAllowed: false,
    specialCharacter: 1,
    digits: 1,
    upperCase: 1,
    length: 3,
    randomizeOutput: false
  }) {
  const isRequirementsObj =
    Object.prototype.toString.call(requirements) === '[object Object]';
  const patternStructure = {
    spaceAllowed: '@boolean',
    specialCharacter: '@number',
    digits: '@number',
    upperCase: '@number',
    length: '@number',
    randomizeOutput: '@boolean'
  };

  switch (true) {
    case typeof stringToTransform !== 'string':
      throw new ArgumentError('"stringToTransform" must be String');
    case !isRequirementsObj:
      throw new ArgumentError('"requirements" must be an Object');
    case !isTheSameStructureOfObj(
      patternStructure, requirements, false, false, true):
      throw new ArgumentError('The "requirements" argument' +
        'has diffrent structure than "patternStructure"');
  }

  const {
    spaceAllowed,
    specialCharacter,
    digits,
    upperCase,
    length,
    randomizeOutput
  } = requirements;

  switch (true) { // test requirements dependencies
    case specialCharacter + digits + upperCase > length:
      throw new ArgumentError('"Length" must be greater or equal sum of; ' +
        '"digits", "upperCase", "specialCharacter"');
    case specialCharacter < 0:
      throw new ArgumentError('"specialCharacter" must be greater than -1');
    case digits < 0:
      throw new ArgumentError('"digits" must be greater than -1');
    case upperCase < 0:
      throw new ArgumentError('"upperCase" must be greater than -1');
  }

  const actualSpecialCharacters = stringToTransform.match(/[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/g)?.length ?? 0;
  const actualDigits = stringToTransform.match(/\d/g)?.length ?? 0;
  const actualUpperCase = stringToTransform.match(/\p{Lu}/gu)?.length ?? 0;
  const actualLength = stringToTransform.length;
  const isInvalidStringCheck =
    (actualSpecialCharacters !== specialCharacter) ||
    (actualDigits !== digits) ||
    (actualUpperCase !== upperCase) ||
    (actualLength !== length);
  let correctString = stringToTransform;

  if (isInvalidStringCheck) {
    const charsForAdding = [
      `!"#$%&'()*+,-.:;<=>?@[]^_\`{|}~\\`.split(''),
      '0123456789'.split(''),
      'qwertyuioplkjhgfdsazxcvbnm'.split('')
    ];
    const [specialCharactersList, digitsList, lettersList] = charsForAdding;
    const whatToDo = (() => { // actually what do with type of data
      const specialToRemove = actualSpecialCharacters - specialCharacter;
      const digitToRemove = actualDigits - digits;
      const upperCaseToRemove = actualUpperCase - upperCase;

      return [specialToRemove, digitToRemove, upperCaseToRemove];
    })();

    if (!spaceAllowed) {
      correctString = correctString.replace(/ /g, '');
    }

    whatToDo.forEach((charTypeNumber, index) => {
      if (charTypeNumber === 0) {
        return;
      }
      let regexToReplaceMethod;
      let indexForAdding;
      const howManyReplace = Math.max(charTypeNumber, 1);
      const howManyAdd = Math.abs(charTypeNumber);

      switch (index) {
        case 0: // special regex
          regexToReplaceMethod = /[!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~]/;
          indexForAdding = specialCharactersList.length;
          break;
        case 1: // digits regex
          regexToReplaceMethod = /\d/;
          indexForAdding = digitsList.length;
          break;
        case 2: // upperCase regex
          regexToReplaceMethod = /\p{Lu}/u;
          indexForAdding = lettersList.length;
          break;
      }

      switch (Math.sign(charTypeNumber)) {
        case 1: // removing
          for (let i = 0; i < howManyReplace; i++) {
            correctString = correctString.replace(regexToReplaceMethod, '');
          }
          return;
        case -1: // adding
          for (let i = 0; i < howManyAdd; i++) {
            const randomIndex = Math.floor(Math.random() * indexForAdding);

            correctString += charsForAdding[index][randomIndex].toUpperCase();
          }
      }
    });

    if (correctString.length > length) {
      const lettersToRemove = correctString.length - length;

      for (let i = 0; i < lettersToRemove; i++) {
        correctString = correctString.replace(/\p{Ll}/u, '');
      }
    }

    if (correctString.length < length) {
      const lettersToAdd = length - correctString.length;

      for (let i = 0; i < lettersToAdd; i++) {
        const randomLetterIndex =
          Math.floor(Math.random() * lettersList.length);

        correctString += lettersList[randomLetterIndex];
      }
    }

    if (randomizeOutput) {
      return randomize(correctString);
    }

    return correctString;
  } // end of if (isInvalidStringCheck) {...}

  if (randomizeOutput) {
    return randomize(correctString);
  }

  return correctString;
}

/**
 *
 * @param {array} options
 * @returns {*}
 */
function returnRandom(options) {
  const isArray = Array.isArray(options);

  if (!isArray) {
    throw new Error('"options" must be an Array');
  } else if (options.length < 2) {
    throw new Error('"options" must have at least two elements');
  }

  const whichToReturn = Math.floor(Math.random() * options.length);

  return options[whichToReturn];
}

/**
 *
 * @param {number} number1
 * @param {number} number2
 * @param {number} number3
 * @param {number} totalNumber
 * @returns {array}
 */
function packIntoNumber(
  number1 = 0, number2 = 0, number3 = 0, totalNumber = 1) {
  switch (true) {
    case typeof number1 !== 'number':
    case typeof number2 !== 'number':
    case typeof number3 !== 'number':
    case typeof totalNumber !== 'number':
      throw new Error('All of the arguments of "packIntoNumber" ' +
        'function must be Number');
    case totalNumber <= 0:
      throw new Error('"totalNumber must be greater than 0"');
    case !(Number.isInteger(totalNumber)):
      throw new Error('"totalNumber" must be Integer');
  }

  let a = number1;
  let b = number2;
  let c = number3;

  const toSubtrack = () => {
    return a + b + c > totalNumber;
  };

  if (toSubtrack()) {
    do {
      const isATheBiggest =
        a >= b &&
        a >= c;
      const isBTheBiggest =
        b >= a &&
        b >= c;
      const isCTheBiggest =
        c >= a &&
        c >= b;

      switch (true) {
        case isATheBiggest:
          a--;
          break;
        case isBTheBiggest:
          b--;
          break;
        case isCTheBiggest:
          c--;
          break;
      }
    } while (toSubtrack());
  }

  return [a, b, c];
}

function decomposeEmailAdress(validEmail) {
  if (typeof validEmail !== 'string') {
    throw new Error('"email" argument must be String!');
  }

  const emailUsername = validEmail.match(/^.+?(?=@)/);
  const separatingCharacter = validEmail.match(/@/);
  const domainName = validEmail.match(/(?<=@)[a-z0-9-]+/i);
  const separatingCharacter2 = validEmail.match(/[.](?=[a-z]+$)/i);
  const topLevelDomain = validEmail.match(/[a-z]+$/i);

  return [...emailUsername, ...separatingCharacter, ...domainName,
    ...separatingCharacter2, ...topLevelDomain];
}

function recomposeEmailAdress(validEmail,
  deconstructionObj = {
    username: '',
    separatingCharacter: '',
    domainName: '',
    separatingCharacter2: '',
    topLevelDomain: ''
  }) {
  if (arguments.length < 2) {
    throw new Error('Function "recomposeEmailAdress" must have 2 arguments ' +
      'and 2nd argument must have at least one required property');
  }
  const typeOfArgument1 = Object.prototype.toString.apply(arguments[0]);
  const typeOfArgument2 = Object.prototype.toString.apply(arguments[1]);

  if (typeOfArgument2 !== '[object Object]') {
    throw new Error('2nd argument of the "recomposeEmailAdress" funcion' +
      ' must be [object Object]');
  } else if (typeOfArgument1 !== '[object String]') {
    throw new Error('1st argument of the "recomposeEmailAdress" funcion' +
      ' must be [object String]');
  }

  const {
    username = '', separatingCharacter = '', domainName = '',
    separatingCharacter2 = '', topLevelDomain = ''
  } = deconstructionObj;
  const ifAllPropertiesAreString =
    typeof username === 'string' &&
    typeof separatingCharacter === 'string' &&
    typeof domainName === 'string' &&
    typeof separatingCharacter2 === 'string' &&
    typeof topLevelDomain === 'string';
  const isValidEmailString = typeof validEmail === 'string';

  if (!ifAllPropertiesAreString || !isValidEmailString) {
    throw new Error('1st argument must be String' +
      ' 2nd must be object with only String values');
  }

  const decomposedEmail = decomposeEmailAdress(validEmail);

  for (let i = 0; i < Object.keys(arguments[1]).length; i++) {
    const propertyToChange = Object.keys(arguments[1])[i];

    switch (propertyToChange) {
      case 'username':
        decomposedEmail[0] = username;

        break;
      case 'separatingCharacter':
        decomposedEmail[1] = separatingCharacter;

        break;
      case 'domainName':
        decomposedEmail[2] = domainName;

        break;
      case 'separatingCharacter2':
        decomposedEmail[3] = separatingCharacter2;

        break;
      case 'topLevelDomain':
        decomposedEmail[4] = topLevelDomain;

        break;
      default:
        throw new Error('"deconstructionObj" of the "recomposeEmailAdress"' +
          'function has additional property');
    }
  }

  const result = decomposedEmail[0] + decomposedEmail[1] + decomposedEmail[2] +
    decomposedEmail[3] + decomposedEmail[4];

  return result;
}

const generateRandomLetter = () => {
  const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('');
  const randomLetter = letters[Math.floor(Math.random() * 27)];
  const toUpperCase = Boolean(Math.floor(Math.random() * 2));

  if (toUpperCase) {
    return randomLetter.toUpperCase();
  }

  return randomLetter;
};

const generateRandomDigit = () => {
  const randomDigit = Math.floor(Math.random() * 10);

  return randomDigit;
};

const generateRandomSpecialCharacter = () => {
  const specials = `!"#$%&'()*+,-.:;<=>?@[]^_\`{|}~\\`.split('');
  const randomIndex = Math.floor(Math.random() * specials.length);

  return specials[randomIndex];
};

/**
 *
 * @param {string} text
 * @param {number} amountOfWords
 * @returns {string}
 */
function cutText(text, amountOfWords = 1) {
  switch (true) {
    case typeof text !== 'string':
      throw new Error('"text" must be String');
    case typeof amountOfWords !== 'number':
      throw new Error('"amountOfWords" must be Number');
    case amountOfWords <= 0:
      throw new Error('"amountOfWords" must be greater than 0');
  }

  const allTextWords = text.split(' ').filter((word) => word !== '');
  const maxWords = Math.min(allTextWords.length, amountOfWords);
  let result = '';

  for (let i = 0; i < maxWords; i++) {
    result += allTextWords[i] + ' ';
  }

  return result.trimEnd();
}

export {
  ArgumentError,
  StructureError,
  isTheSameStructureOfObj,
  randomize,
  stringTransformator,
  returnRandom,
  packIntoNumber,
  decomposeEmailAdress,
  recomposeEmailAdress,
  generateRandomDigit,
  generateRandomLetter,
  generateRandomSpecialCharacter,
  cutText
};
