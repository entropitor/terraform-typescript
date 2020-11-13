module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['**/{src,test}/**/*.{js,ts}'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['.*/node_modules/', '.*/dist/'],
};
