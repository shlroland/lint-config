import pkg from '@shlroland/eslint-config/package.json'
import type { PackageJson } from 'type-fest'
import {
  createDepsNameWithVersion,
  deletePropAboutPkg,
  jointConfigurationExt,
} from '../utils/generate'
import type { TaskFn } from '../utils/types'

export const eslint: TaskFn = () => {
  return {
    name: 'eslint',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
    toRemoveFiles: jointConfigurationExt('.eslintrc'),
    toAddFiles: [
      {
        name: '.eslintrc.js',
        content: `module.exports = {extends: ['@shlroland']}`,
      },
    ],
    extraTasks: [
      async () => {
        await deletePropAboutPkg('eslintConfig')
      },
    ],
  }
}
