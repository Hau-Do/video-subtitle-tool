module.exports = {
  // coverage must be set up in this file
  // and run all tests at once
  collectCoverageFrom: [
    // include -----------------------
    // client code
    '<rootdir>/src/components/**/*.{ts,tsx}',
    // client hooks
    '!node_modules'
  ],
  // this is default, can be undefined
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
}
