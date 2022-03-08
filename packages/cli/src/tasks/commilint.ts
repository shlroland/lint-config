import type { PackageJson } from 'type-fest'
import pkg from '@shlroland/commitlint-config/package.json'
import { createDepsNameWithVersion } from '../utils/generate'
import type { TaskReturn } from '../utils/types'

export const commitlint = (): TaskReturn => {
  return {
    name: 'commitlint',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
  }
}
