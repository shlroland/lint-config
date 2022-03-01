"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    extends: ['plugin:react/recommended', '@shlroland/eslint-config-ts'],
    settings: {
        react: {
            version: '17.0',
        },
    },
    rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        'react/react-in-jsx-scope': 'off',
    },
};
exports.default = config;
module.exports = config;
