"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    hooks: {
        'commit-msg': [
            { name: 'commitlint', content: 'commitlint -E HUSKY_GIT_PARAMS' },
        ],
        'pre-commit': [{ name: 'lint-staged', content: 'lint-staged' }],
    },
};
exports.default = config;
module.exports = config;
