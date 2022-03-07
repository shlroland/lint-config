import pkg from '@shlroland/eslint-config/package.json';
import { createDepsNameWithVersion } from '../utils/generate';
export const eslint = () => {
    return {
        name: 'eslint',
        toInstallDeps: [...createDepsNameWithVersion(pkg)],
        toRemoveFiles: [
            '.eslintrc',
            '.eslintrc.js',
            '.eslintrc.cjs',
            '.eslintrc.yaml',
            '.eslintrc.yml',
            '.eslintrc.json',
        ],
        toAddFiles: [
            {
                name: '.eslintrc.js',
                content: `module.exports = {extends: ['@shlroland']}`,
            },
        ],
    };
};
