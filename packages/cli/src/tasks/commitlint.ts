import type { PackageJson } from 'type-fest'
import pkg from '@shlroland/commitlint-config/package.json'
import {
  createDepsNameWithVersion,
  deletePropAboutPkg,
  jointConfigurationExt,
} from '../utils/generate'
import type { TaskReturn } from '../utils/types'

export const commitlint = (): TaskReturn => {
  return {
    name: 'commitlint',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
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
    extraTasks: [
      async () => {
        await deletePropAboutPkg('commitlint')
      },
    ],
  }
}
