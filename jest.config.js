module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '<rootDir>/libs/tests/setup.js',
    '<rootDir>/libs/tests/cleanup.js',
  ],
  testRegex: '.*\\.(spec|test)\\.js$', // détecte tous les fichiers .spec.ts ou .test.ts
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['**/*.(t|j)s', '!**/node_modules/**', '!**/dist/**'],
  coverageDirectory: './coverage',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleNameMapper: {
    '^@app/common(|/.*)$': '<rootDir>/libs/common/src/$1',
  },
  maxWorkers: 1,
};
