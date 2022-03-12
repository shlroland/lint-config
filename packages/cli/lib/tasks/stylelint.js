import pkg from '@shlroland/stylelint-config/package.json'
import {
  createDepsNameWithVersion,
  jointConfigurationExt,
} from '../utils/generate'
export const stylelint = () => {
  return {
    name: 'stylelint',
    toInstallDeps: [...createDepsNameWithVersion(pkg)],
    toRemoveFiles: jointConfigurationExt(['.stylelintrc', 'stylelint.config']),
    toAddFiles: [
      {
        name: 'stylelint.config.js',
        content: 'module.exports = require("@shlroland/stylelint-config")',
      },
    ],
  }
}
