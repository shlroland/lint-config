import pkg from '@shlroland/commitlint-config/package.json'
import {
  createDepsNameWithVersion,
  jointConfigurationExt,
} from '../utils/generate'
export const commitlint = () => {
  return {
    name: 'commitlint',
    toInstallDeps: [...createDepsNameWithVersion(pkg)],
    toRemoveFiles: jointConfigurationExt([
      '.commitlintrc',
      'commitlint.config',
    ]),
    toAddFiles: [
      {
        name: 'commitlint.config.js',
        content: `module.exports = require('@shlroland/commitlint-config')`,
      },
    ],
  }
}
