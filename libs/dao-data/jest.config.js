module.exports = {
  displayName: 'data',
  preset: '../../jest.preset.js',
  resolver: 'jest-resolver-enhanced',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/dao-data',
};
