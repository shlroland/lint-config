"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    hooks: {
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
        'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true',
        'pre-commit': 'lint-staged',
    },
};
exports.default = config;
module.exports = config;
