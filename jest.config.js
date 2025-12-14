/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/server/routes/**/*.ts',
    '!src/server/routes/**/*.test.ts',
    '!src/server/routes/**/__tests__/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/server/__tests__/setup.ts'],
  testTimeout: 10000,
};

