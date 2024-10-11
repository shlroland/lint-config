import type { Configs } from '../../types'
import { parseNlx, run } from '@antfu/ni'
import huskyConfig from '@shlroland/husky-config'
import { LintTools } from '../../constants'
import { cjsConfigFactory, esmConfigFactory } from './helpers'

export const configFilePaths = {
  eslint: 'eslint.config.js',
  prettier: 'prettier.config.js',
  commitlint: 'commitlint.config.js',
  lintStaged: 'lint-staged.config.js',
}

export const huskyConfigFilePaths = {
  preCommit: '.husky/pre-commit',
  commitMsg: '.husky/commit-msg',
}

export async function executeHuskyInit() {
  await run(parseNlx, ['husky', 'init'])
}

export function configsFactory(moduleType: 'module' | 'commonjs' | undefined): Configs {
  if (!moduleType) {
    moduleType = 'commonjs'
  }

  return {
    [LintTools.ESLINT]: {
      options: [
        {
          filePath: configFilePaths.eslint,
          fileContent: moduleType === 'module'
            ? esmConfigFactory('shlroland()', 'import { shlroland } from "@shlroland/eslint-config"')
            : cjsConfigFactory('shlroland()', 'const { shlroland } = require("@shlroland/eslint-config")'),
        },
      ],
    },
    [LintTools.COMMITLINT_CZG]: {
      options: [
        {
          filePath: configFilePaths.commitlint,
          fileContent: moduleType === 'module'
            ? esmConfigFactory(`{ extends: ['@shlroland/cz-config/commitlint'] }`, '')
            : cjsConfigFactory(`{ extends: ['@shlroland/cz-config/commitlint'] }`, ''),
        },
      ],
    },
    [LintTools.LINT_STAGED]: {
      options: [
        {
          filePath: configFilePaths.lintStaged,
          fileContent: moduleType === 'module'
            ? esmConfigFactory('lintStaged', 'import lintStaged from "@shlroland/lint-staged"')
            : cjsConfigFactory('lintStaged', 'const lintStaged = require("@shlroland/lint-staged")'),
        },
      ],
    },
    [LintTools.HUSKY]: {
      preInit: executeHuskyInit,
      options: [
        {
          filePath: huskyConfigFilePaths.preCommit,
          fileContent: huskyConfig.hooks['pre-commit'],
        },
        {
          filePath: huskyConfigFilePaths.commitMsg,
          fileContent: huskyConfig.hooks['commit-msg'],
        },
      ],
    },
  }
}
