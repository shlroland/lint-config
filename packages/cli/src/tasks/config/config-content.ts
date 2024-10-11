import { parseNlx, run } from '@antfu/ni'
import huskyConfig from '@shlroland/husky-config'
import { x } from 'tinyexec'
import { shouldInitGitPrompt } from '../../prompts'
import { isGitRepository } from '../../utils'

export const ESLINT_ESM_IMPORT_CONTENT = 'import { shlroland } from "@shlroland/eslint-config"'
export const ESLINT_CJS_IMPORT_CONTENT = 'const shlroland = require("@shlroland/eslint-config")'

export const configFilePaths = {
  eslint: 'eslint.config.js',
  prettier: 'prettier.config.js',
  commitlint: 'commitlint.config.js',
  lintStaged: 'lint-staged.config.js',
}

export async function executeHuskyInit() {
  const isGit = isGitRepository(process.cwd())
  if (!isGit) {
    const shouldInitGit = await shouldInitGitPrompt()
    if (shouldInitGit) {
      await x('git', ['init'])
    }
    else {
      return
    }
  }
  await run(parseNlx, ['husky', 'init'])
}

export const HUSKY_PRE_COMMIT_CONTENT = huskyConfig.hooks['pre-commit']

export const HUSKY_PRE_COMMIT_PATH = '.husky/pre-commit'

export const HUSKY_COMMIT_MSG_CONTENT = huskyConfig.hooks['commit-msg']

export const HUSKY_COMMIT_MSG_PATH = '.husky/commit-msg'