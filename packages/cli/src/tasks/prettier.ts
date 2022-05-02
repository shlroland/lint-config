import pkg from '@shlroland/prettier-config/package.json'
import type { PackageJson } from 'type-fest'
import type { TaskFn } from '../utils/types'
import {
  createDepsNameWithVersion,
  deletePropAboutPkg,
  jointConfigurationExt,
} from '../utils/generate'

export const prettier: TaskFn = () => {
  return {
    name: 'prettier',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
    toRemoveFiles: jointConfigurationExt(['.prettierrc', 'prettier.config']),
    toAddFiles: [
      {
        name: 'prettier.config.js',
        content: 'module.exports = require("@shlroland/prettier-config")',
      },
    ],
    extraTasks: [
      async () => {
        await deletePropAboutPkg('prettier')
      },
    ],
  }
}
