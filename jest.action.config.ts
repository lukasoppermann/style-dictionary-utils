import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [['github-actions', { silent: false }], 'summary'],
};

export default config;