import type { CheckConfigResult, Configs } from '../../types'
import fs from 'node:fs/promises'
import path from 'node:path'
import { LintTools } from '../../constants'
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
} from './config-content'

const esmConfigs: Configs = {
  [LintTools.ESLINT]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_ESM_IMPORT_CONTENT,
        exportContent: 'shlroland()',
      },
    ],
  },
  [LintTools.CZG]: {
    options: [
      {
        filePath: configFilePaths.commitlint,
        importContent: '',
        exportContent: `{
        extends: ['@shlroland/cz-config/czg']
    }`,
      },
    ],
  },
  [LintTools.COMMITLINT]: {
    options: [
      {
        filePath: configFilePaths.commitlint,
        importContent: '',
        exportContent: `{
        extends: ['@shlroland/cz-config/commitlint']
    }`,
      },
    ],
  },
  [LintTools.LINT_STAGED]: {
    options: [
      {
        filePath: configFilePaths.lintStaged,
        importContent: 'import lintStaged from "@shlroland/lint-staged"',
        exportContent: `lintStaged`,
      },
    ],
  },
  [LintTools.HUSKY]: {
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
  [LintTools.ESLINT]: {
    options: [
      {
        filePath: configFilePaths.eslint,
        importContent: ESLINT_CJS_IMPORT_CONTENT,
        exportContent: 'shlroland()',
      },
    ],
  },
  [LintTools.CZG]: {
    options: [
      {
        filePath: configFilePaths.commitlint,
        importContent: '',
        exportContent: `{
        extends: ['@shlroland/cz-config/czg']
    }`,
      },
    ],
  },
  [LintTools.COMMITLINT]: {
    options: [
      {
        filePath: configFilePaths.commitlint,
        importContent: '',
        exportContent: `{
        extends: ['@shlroland/cz-config/commitlint']
    }`,
      },
    ],
  },
  [LintTools.LINT_STAGED]: {
    options: [
      {
        filePath: configFilePaths.lintStaged,
        importContent: 'const lintStaged = require("@shlroland/lint-staged")',
        exportContent: `lintStaged`,
      },
    ],
  },
  [LintTools.HUSKY]: {
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

    await writeConfigFile(cwd, config, moduleType)
  }
}

async function writeConfigFile(cwd: string, config: CheckConfigResult, moduleType: 'module' | 'commonjs' | undefined) {
  const configs = moduleType === 'module' ? esmConfigs : cjsConfigs
  const factory = moduleType === 'module' ? esmConfigFactory : cjsConfigFactory
  const pendingConfig = configs[config.moduleName]
  if (pendingConfig.preInit) {
    const result = await pendingConfig.preInit()
    if (result === 'skip') {
      return
    }
  }

  for (const c of pendingConfig.options) {
    const configFilePath = path.join(cwd, c.filePath)
    const content = factory(c.exportContent, c.importContent)
    await fs.writeFile(configFilePath, content)
  }
}

export function getConfigFilesWillWriteList(configResult: CheckConfigResult[]) {
  const configFiles = new Set<string>()

  for (const { moduleName } of configResult) {
    switch (moduleName) {
      case LintTools.ESLINT:
        configFiles.add(configFilePaths.eslint)
        continue
      case LintTools.CZG:
      case LintTools.COMMITLINT:
        configFiles.add(configFilePaths.commitlint)
        continue
      case LintTools.LINT_STAGED:
        configFiles.add(configFilePaths.lintStaged)
        continue
      case LintTools.HUSKY:
        configFiles.add(HUSKY_PRE_COMMIT_PATH)
        configFiles.add(HUSKY_COMMIT_MSG_PATH)
        continue
    }
  }
  return Array.from(configFiles).join('\n')
}
