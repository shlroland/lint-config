"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stylelint = exports.eslint = exports.prettier = void 0;
const helpers_1 = require("./helpers");
const operators_1 = require("./operators");
exports.prettier = (0, operators_1.wrap)((filenames) => {
    if (!filenames.length)
        return [];
    const cliFileNames = (0, helpers_1.fileNamesToCliArg)(filenames);
    return [`pnpm prettier --write ${cliFileNames}`];
});
exports.eslint = (0, operators_1.wrap)((filenames) => {
    if (!filenames.length)
        return [];
    const cliFileNames = (0, helpers_1.fileNamesToCliArg)(filenames.filter((f) => !f.includes('eslint')));
    return [`pnpm eslint ${cliFileNames}`];
});
exports.stylelint = (0, operators_1.wrap)((filenames) => {
    if (!filenames.length)
        return [];
    const cliFileNames = (0, helpers_1.fileNamesToCliArg)(filenames);
    return [
        `stylelint --fix --formatter verbose --allow-empty-input ${cliFileNames}`,
    ];
});
