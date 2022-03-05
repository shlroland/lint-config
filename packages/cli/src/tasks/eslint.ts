import { name } from '@shlroland/eslint-config/package.json'
import type { InstallReturn } from '../utils/types'

export const installESLint = (): InstallReturn => {
  return {
    name: 'eslint',
    toInstallDeps: [name],
    toRemoveFiles: ['.eslintrc'],
    toAddFiles: ['.eslintrc.js'],
  }
}
