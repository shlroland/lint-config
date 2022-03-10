import pkg from '@shlroland/commitizen-config/package.json'
import type { PackageJson } from 'type-fest'
import type { TaskReturn } from '../utils/types'
import {
  createDepsNameWithVersion,
  jointConfigurationExt,
} from '../utils/generate'

export const commitizen = (): TaskReturn => {
  return {
    name: 'commitizen',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
    toRemoveFiles: jointConfigurationExt('.czrc'),
    toAddFiles: [
      {
        name: '.czrc',
        content: `{
            "path": "node_modules/cz-git",
            "useEmoji": true
          }`,
      },
    ],
  }
}
