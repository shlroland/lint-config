import pkg from '@shlroland/husky-config/package.json'
import config from '@shlroland/husky-config'
import type { PackageJson } from 'type-fest'
import execa from 'execa'
import type { TaskReturn } from '../utils/types'
import { createDepsNameWithVersion } from '../utils/generate'
import { exec } from '../utils/exec'

export const husky = (): TaskReturn => {
  return {
    name: 'husky',
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
    extraTasks: [
      async () => {
        return exec('pnpm husky install')
      },
      async () => {
        return Promise.all(
          Object.entries(config.hooks).map(([name, hook]) => {
            const cli = [`husky`, `add`, `.husky/${name}`, `"${`npx ${hook}`}"`]
            return execa('npx', cli)
          }),
        )
      },
    ],
  }
}
