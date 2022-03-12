import pkg from '@shlroland/eslint-config/package.json'
import {
  createDepsNameWithVersion,
  jointConfigurationExt,
} from '../utils/generate'
export const eslint = () => {
  return {
    name: 'eslint',
    toInstallDeps: [...createDepsNameWithVersion(pkg)],
    toRemoveFiles: jointConfigurationExt('.eslintrc'),
    toAddFiles: [
      {
        name: '.eslintrc.js',
        content: `module.exports = {extends: ['@shlroland']}`,
      },
    ],
  }
}
