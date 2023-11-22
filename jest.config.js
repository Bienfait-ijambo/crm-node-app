/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    transform: {},
    preset: 'ts-jest',
    testEnvironment: 'node',
    // testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
  
    maxWorkers:2
  };