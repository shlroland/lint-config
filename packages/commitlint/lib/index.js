"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'subject-case': [0],
        'scope-case': [0],
    },
};
exports.default = config;
module.exports = config;
