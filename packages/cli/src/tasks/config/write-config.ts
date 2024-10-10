import type { Answers, CheckConfigResult, Configs } from '../../types'
import fs from 'node:fs/promises'
import path from 'node:path'
import {
  CodeLintTools,
  FormatTools,
  GitLintTools,
} from '../../constants'
import { deleteFile, getModuleType } from '../../utils'
import {
  configFilePaths,
  ESLINT_CJS_IMPORT_CONTENT,
  ESLINT_ESM_IMPORT_CONTENT,
  executeHuskyInit,
  HUSKY_COMMIT_MSG_CONTENT,
  HUSKY_COMMIT_MSG_PATH,
  HUSKY_PRE_COMMIT_CONTENT,
  HUSKY_PRE_COMMIT_PATH,
  PRETTIER_CJS_IMPORT_CONTENT,
  PRETTIER_ESM_IMPORT_CONTENT,
} from './config-content'

const esmConfigs: Configs = {
  [CodeLintTools.ESLINT_DEFAULT]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_ESM_IMPORT_CONTENT,
        exportContent: 'shlroland()',
      },
    ],
  },
  [CodeLintTools.ESLINT_NO_EXTERNAL]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_ESM_IMPORT_CONTENT,
        exportContent: 'shlroland({ formatters: false })',
      },
    ],
  },
  [CodeLintTools.ESLINT_NO_FORMATTER]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_ESM_IMPORT_CONTENT,
        exportContent: 'shlroland({ formatters: false, stylistic: false })',
      },
    ],
  },
  [CodeLintTools.ESLINT_PRETTIER]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_ESM_IMPORT_CONTENT,
        exportContent: 'shlroland({ formatters: false, stylistic: false })',
      },
    ],
  },
  [FormatTools.PRETTIER]: {
    options: [
      {
        filePath: configFilePaths.prettier,
        importContent: PRETTIER_ESM_IMPORT_CONTENT,
        exportContent: 'shlroland()',
      },
    ],
  },
  [GitLintTools.COMMITLINT]: {
    options: [
      {
        filePath: configFilePaths.commitlint,
        importContent: '',
        exportContent: `{
        extends: ['@shlroland/commitlint-config']
    }`,
      },
    ],
  },
  [GitLintTools.LINT_STAGED]: {
    options: [
      {
        filePath: configFilePaths.lintStaged,
        importContent: 'import lintStaged from "@shlroland/lint-staged"',
        exportContent: `lintStaged`,
      },
    ],
  },
  [GitLintTools.HUSKY]: {
    preInit: executeHuskyInit,
    options: [
      {
        filePath: HUSKY_PRE_COMMIT_PATH,
        importContent: '',
        exportContent: HUSKY_PRE_COMMIT_CONTENT,
      },
      {
        filePath: HUSKY_COMMIT_MSG_PATH,
        importContent: '',
        exportContent: HUSKY_COMMIT_MSG_CONTENT,
      },
    ],
  },
}

const cjsConfigs: Configs = {
  [CodeLintTools.ESLINT_DEFAULT]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_CJS_IMPORT_CONTENT,
        exportContent: 'shlroland()',
      },
    ],
  },
  [CodeLintTools.ESLINT_NO_EXTERNAL]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_CJS_IMPORT_CONTENT,
        exportContent: 'shlroland({ formatters: false })',
      },
    ],
  },
  [CodeLintTools.ESLINT_NO_FORMATTER]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_CJS_IMPORT_CONTENT,
        exportContent: 'shlroland({ formatters: false, stylistic: false })',
      },
    ],
  },
  [CodeLintTools.ESLINT_PRETTIER]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_CJS_IMPORT_CONTENT,
        exportContent: 'shlroland({ formatters: false, stylistic: false })',
      },
    ],
  },
  [FormatTools.PRETTIER]: {
    options: [
      {
        filePath: configFilePaths.prettier,
        importContent: PRETTIER_CJS_IMPORT_CONTENT,
        exportContent: 'shlroland()',
      },
    ],
  },
  [GitLintTools.COMMITLINT]: {
    options: [
      {
        filePath: configFilePaths.commitlint,
        importContent: '',
        exportContent: `{
        extends: ['@shlroland/commitlint-config']
    }`,
      },
    ],
  },
  [GitLintTools.LINT_STAGED]: {
    options: [
      {
        filePath: configFilePaths.lintStaged,
        importContent: 'const lintStaged = require("@shlroland/lint-staged")',
        exportContent: `lintStaged`,
      },
    ],
  },
  [GitLintTools.HUSKY]: {
    preInit: executeHuskyInit,
    options: [
      {
        filePath: HUSKY_PRE_COMMIT_PATH,
        importContent: '',
        exportContent: HUSKY_PRE_COMMIT_CONTENT,
      },
      {
        filePath: HUSKY_COMMIT_MSG_PATH,
        importContent: '',
        exportContent: HUSKY_COMMIT_MSG_CONTENT,
      },
    ],
  },
}

function esmConfigFactory(exportContent: string, importContent: string) {
  return `
  ${importContent}

  export default ${exportContent}
  `
}

function cjsConfigFactory(exportContent: string, importContent: string) {
  return `
  ${importContent}

  module.exports = ${exportContent}
  `
}

export async function writeConfig(configs: CheckConfigResult[]) {
  const cwd = process.cwd()
  const moduleType = await getModuleType(cwd)

  for (const config of configs) {
    if (config.shouldOverride === true && config.exitedFilePath) {
      await deleteFile(config.exitedFilePath)
    }

    if (moduleType === 'module') {
      await writeEsmConfig(cwd, config)
    }
    else {
      await writeCjsConfig(cwd, config)
    }
  }
}

async function writeEsmConfig(cwd: string, config: CheckConfigResult) {
  const esmConfig = esmConfigs[config.choice]
  if (esmConfig.preInit) {
    const result = await esmConfig.preInit()
    if (result === 'skip') {
      return
    }
  }

  for (const c of esmConfig.options) {
    const configFilePath = path.join(cwd, c.filePath)
    const content = esmConfigFactory(c.exportContent, c.importContent)
    await fs.writeFile(configFilePath, content)
  }
}

async function writeCjsConfig(cwd: string, config: CheckConfigResult) {
  const cjsConfig = cjsConfigs[config.choice]
  if (cjsConfig.preInit) {
    const result = await cjsConfig.preInit()
    if (result === 'skip') {
      return
    }
  }

  for (const c of cjsConfig.options) {
    const configFilePath = path.join(cwd, c.filePath)
    const content = cjsConfigFactory(c.exportContent, c.importContent)
    await fs.writeFile(configFilePath, content)
  }
}

export function getConfigFilesWillWriteList(answers: Answers) {
  const configFiles = new Set<string>()
  const { codeLintTools, gitLintTools } = answers
  const lintTools = [codeLintTools, ...gitLintTools]
  for (const lintTool of lintTools) {
    switch (lintTool) {
      case CodeLintTools.ESLINT_DEFAULT:
      case CodeLintTools.ESLINT_NO_EXTERNAL:
      case CodeLintTools.ESLINT_NO_FORMATTER:
        configFiles.add(configFilePaths.eslint)
        continue
      case CodeLintTools.ESLINT_PRETTIER:
        configFiles.add(configFilePaths.eslint)
        configFiles.add(configFilePaths.prettier)
        continue
      case GitLintTools.COMMITLINT:
        configFiles.add(configFilePaths.commitlint)
        continue
      case GitLintTools.LINT_STAGED:
        configFiles.add(configFilePaths.lintStaged)
        continue
      case GitLintTools.HUSKY:
        configFiles.add(HUSKY_PRE_COMMIT_PATH)
        configFiles.add(HUSKY_COMMIT_MSG_PATH)
        continue
    }
  }
  return Array.from(configFiles).join('\n')
}
