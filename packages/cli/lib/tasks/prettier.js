import pkg from '@shlroland/prettier-config/package.json'
import {
  createDepsNameWithVersion,
  jointConfigurationExt,
} from '../utils/generate'
export const prettier = () => {
  return {
    name: 'prettier',
    toInstallDeps: [...createDepsNameWithVersion(pkg)],
    toRemoveFiles: jointConfigurationExt(['.prettierrc', 'prettier.config']),
    toAddFiles: [
      {
        name: 'prettier.config.js',
        content: 'module.exports = require("@shlroland/prettier-config")',
      },
    ],
  }
}
