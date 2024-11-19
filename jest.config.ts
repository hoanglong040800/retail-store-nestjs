import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // Map paths to root directory. https://stackoverflow.com/a/60620682/19568962
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'modules/**/*.ts',
    'utils/**/*.ts',
    '!modules/**/*.(repo|module|swagger|const|dto).ts',
    '!**/index.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      lines: 90,
    },
  },
  coverageDirectory: '../coverage',
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.ts'],
};

export default config;
