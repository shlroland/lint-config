import pkg from '@shlroland/eslint-config/package.json'
import type { PackageJson } from 'type-fest'
import { createDepsNameWithVersion } from '../utils/generate'
import type { TaskReturn } from '../utils/types'

export const eslint = (): TaskReturn => {
  return {
    name: 'eslint',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
    toRemoveFiles: [
      '.eslintrc',
      '.eslintrc.js',
      '.eslintrc.cjs',
      '.eslintrc.yaml',
      '.eslintrc.yml',
      '.eslintrc.json',
    ],
    toAddFiles: [
      {
        name: '.eslintrc.js',
        content: `module.exports = {extends: ['@shlroland']}`,
      },
    ],
  }
}
