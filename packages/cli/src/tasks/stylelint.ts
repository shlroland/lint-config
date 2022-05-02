import type { PackageJson } from 'type-fest'
import pkg from '@shlroland/stylelint-config/package.json'
import {
  createDepsNameWithVersion,
  deletePropAboutPkg,
  jointConfigurationExt,
} from '../utils/generate'
import type { TaskFn } from '../utils/types'

export const stylelint: TaskFn = () => {
  return {
    name: 'stylelint',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
    toRemoveFiles: jointConfigurationExt(['.stylelintrc', 'stylelint.config']),
    toAddFiles: [
      {
        name: 'stylelint.config.js',
        content: 'module.exports = require("@shlroland/stylelint-config")',
      },
    ],
    extraTasks: [
      async () => {
        await deletePropAboutPkg('stylelint')
      },
    ],
  }
}
