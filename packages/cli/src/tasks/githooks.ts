import type { PackageJson } from 'type-fest'
import pkg from '@shlroland/git-hooks/package.json'
import type { HookItem } from '@shlroland/git-hooks'
import config from '@shlroland/git-hooks'
import fs from 'fs-extra'
import type { TaskReturn } from '../utils/types'
import { createDepsNameWithVersion } from '../utils/generate'
import { createFile } from '../utils/file'

export const gitHooks = (): TaskReturn => {
  return {
    name: 'gitHooks',
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
