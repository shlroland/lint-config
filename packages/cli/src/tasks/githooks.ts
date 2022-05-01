import { cwd } from 'process'
import type { PackageJson } from 'type-fest'
import pkg from '@shlroland/git-hooks/package.json'
import type { HookItem } from '@shlroland/git-hooks'
import config from '@shlroland/git-hooks'
import fs from 'fs-extra'
import chalk from 'chalk'
import type { TaskReturn } from '../utils/types'
import { createDepsNameWithVersion } from '../utils/generate'
import { createFile } from '../utils/file'
import { isGitSync } from '../utils/detect'

export const gitHooks = (): TaskReturn => {
  return {
    name: 'gitHooks',
    predecessorTasks: [
      async () => {
        if (!isGitSync(cwd())) {
          throw new Error(
            `You didn't init git in ${cwd()}, please init git first,then visit ${chalk.blue(
              'https://www.npmjs.com/package/git-hook-pure',
            )} to install git-hook-pure manually`,
          )
        }
      },
    ],
    toInstallDeps: [...createDepsNameWithVersion(pkg as PackageJson)],
    extraTasks: [
      async () => {
        const hooks = Object.entries(config.hooks)
        for (let i = 0; i < hooks.length; i++) {
          const [hookName, hook] = hooks[i]
          const hookDirPath = `.githooks/${hookName}`
          for (let j = 0; j < hook.length; j++) {
            const { name, content } = hook[j] as HookItem
            const filePath = `${hookDirPath}/${name}.sh`
            await createFile(filePath, content)
            await fs.chmod(filePath, 0o755)
          }
        }
      },
    ],
  }
}
