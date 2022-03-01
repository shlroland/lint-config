"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    extends: ['prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            { singleQuote: true, trailingComma: 'all', semi: false },
        ],
    },
};
exports.default = config;
module.exports = config;
