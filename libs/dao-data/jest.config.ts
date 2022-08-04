/* eslint-disable */
export default {
  displayName: 'data',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: './jest-environment-jsdom-fix.js',
};
