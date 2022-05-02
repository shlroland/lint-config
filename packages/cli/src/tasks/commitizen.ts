import pkg from '@shlroland/commitizen-config/package.json'
import type { PackageJson } from 'type-fest'
import {
  createDepsNameWithVersion,
  deletePropAboutPkg,
  jointConfigurationExt,
} from '../utils/generate'
import type { TaskFn } from '../utils/types'

export const commitizen: TaskFn = () => {
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
    extraTasks: [
      async () => {
        await deletePropAboutPkg('config.commitizen')
      },
    ],
  }
}
