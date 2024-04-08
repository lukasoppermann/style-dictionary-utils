import type { Config } from 'jest';
const path = require('node:path')
const ROOT_DIR = path.resolve(__dirname)

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
  // setupFilesAfterEnv: ['./src/test-utilities/setupTests.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '@zip.js/zip.js': path.join(
      // Note: we use ROOT_DIR here since this dependency is hoisted
      ROOT_DIR,
      'node_modules',
      '@zip.js',
      'zip.js',
      'index.js',
    ),
    '^(.+)\\.js$': '$1',
  },
};

export default config;