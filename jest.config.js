module.exports = {
  verbose: true,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './coverage',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
        ancestorSeparator: ' › ',
        usePathForSuiteName: 'true',
      },
    ],
  ],
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/dist/**', '!**/docs/**', '!**/build/**'],
  coverageReporters: ['text', 'cobertura', 'lcov'],
  modulePathIgnorePatterns: ['mocks/', 'EndToEnd', 'coverage', 'config', 'docs', 'dist', 'build'],
};
