module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    transformIgnorePatterns: [
        '/node_modules/(?!vue-spinner)'
    ],
    testMatch: [
        '**/?(*.)(spec|test).ts?(x)'
    ]
};
