module.exports = {
    collectCoverageFrom: ['src/**/*.{ts}'],
    setupFiles: ['<rootDir>/__tests__/setup.ts'],
    testMatch: ['<rootDir>/__tests__/**/?(*.)(spec|test).ts'],
    testEnvironment: 'node',
    testURL: 'http://localhost:4444',
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$',
    ],
    moduleNameMapper: {
        '^@(.*)$': '<rootDir>/src/sub-directory/$1'
    },
    moduleFileExtensions: ['js', 'ts'],
    globals: {
        'ts-jest': {
            tsConfig: require('path').join(process.cwd(), 'tsconfig.test.json'),
        },
    },
};

