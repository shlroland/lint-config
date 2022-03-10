import pkg from '@shlroland/lint-staged/package.json'
import type { PackageJson } from 'type-fest'
import type { TaskReturn } from '../utils/types'
import {
  createDepsNameWithVersion,
  jointConfigurationExt,
} from '../utils/generate'

export const lintStaged = (): TaskReturn => {
  return {
    name: 'lintStaged',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
    toRemoveFiles: jointConfigurationExt([
      '.lintstagedrc',
      'lint-staged.config',
    ]),
    toAddFiles: [
      {
        name: 'lint-staged.config.js',
        content: `module.exports = require('@shlroland/lint-staged')`,
      },
    ],
  }
}
