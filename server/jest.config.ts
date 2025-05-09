import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__test__/**/*.test.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@db/(.*)$': '<rootDir>/src/db/$1',
    '^@model/(.*)$': '<rootDir>/src/model/$1',
  },
  verbose: true,
  globals: {
    'ts-jest': {
      isolateModules: true,
    },
  },
};

export default config;
