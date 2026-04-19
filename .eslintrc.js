module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true
  },
  extends: [
    'plugin:cypress/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  ignorePatterns: [
    'cypress/support/index.d.ts'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'cypress'
  ],
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': 'off',
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',
    'max-len': ['error', 80, {
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreComments: true
    }],
    'arrow-parens': ['error', 'always'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-console': ['error']
  }
};
