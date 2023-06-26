import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  roots: ['<rootDir>/test'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/test/**/spec.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': '@swc/jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
