module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Set the test environment to Node.js
  moduleNameMapper: {
    '^@product/(.*)$': '<rootDir>/src/product/$1', // Map @product/* to src/product/*
    '^@product-category/(.*)$': '<rootDir>/src/product-category/$1', // Map @product-category/* to src/product-category/*
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};