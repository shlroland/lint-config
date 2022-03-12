import pkg from '@shlroland/lint-staged/package.json'
import type { PackageJson } from 'type-fest'
import type { TaskReturn } from '../utils/types'
import {
  createDepsNameWithVersion,
  deletePropAboutPkg,
  jointConfigurationExt,
} from '../utils/generate'
import { modifyPkg } from '../utils/file'

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
    extraTasks: [
      async () => {
        modifyPkg((pkg) => {
          pkg.scripts['lint-staged'] = 'lint-staged'
          return pkg
        })
      },
      async () => {
        await deletePropAboutPkg('lint-staged')
      },
    ],
  }
}
