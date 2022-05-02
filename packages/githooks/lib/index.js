"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    hooks: {
        'commit-msg': [
            { name: 'commitlint', content: `npx --no -- commitlint --edit "\${1}"` },
        ],
        'pre-commit': [{ name: 'lint-staged', content: 'lint-staged' }],
    },
};
exports.default = config;
module.exports = config;
