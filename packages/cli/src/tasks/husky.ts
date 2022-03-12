import pkg from '@shlroland/husky-config/package.json'
import type { PackageJson } from 'type-fest'
import type { TaskReturn } from '../utils/types'
import { createDepsNameWithVersion } from '../utils/generate'

export const husky = (): TaskReturn => {
  return {
    name: 'husky',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
  }
}
