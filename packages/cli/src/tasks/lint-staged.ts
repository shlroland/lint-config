import pkg from '@shlroland/lint-staged/package.json'
import type { PackageJson } from 'type-fest'
import {
  createDepsNameWithVersion,
  deletePropAboutPkg,
  jointConfigurationExt,
} from '../utils/generate'
import { modifyPkg } from '../utils/file'
import type { TaskFn } from '../utils/types'
import { kebabize } from '../utils/F'

export const lintStaged: TaskFn = (_ctx, tasks) => {
  const taskNames = tasks.map((task) => kebabize(task.name))
  return {
    name: 'lint-staged',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
    toRemoveFiles: jointConfigurationExt([
      '.lintstagedrc',
      'lint-staged.config',
    ]),
    toAddFiles: [
      {
        name: 'lint-staged.config.js',
        content: `module.exports = require('@shlroland/lint-staged')(${taskNames.includes(
          'stylelint',
        )})`,
      },
    ],
    extraTasks: [
      async () => {
        await modifyPkg((pkg) => {
          pkg.scripts['lint-staged'] = 'lint-staged'
          return pkg
        })
        await deletePropAboutPkg('lint-staged')
      },
    ],
  }
}
