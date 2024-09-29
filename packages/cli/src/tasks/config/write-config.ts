import type { PackageJson } from 'type-fest'
import type { Answers, CheckConfigResult, ConfigChoice, ConfigOptions } from '../../types'
import fs from 'node:fs/promises'
import path from 'node:path'
import {
  CodeLintTools,
  FormatTools,
  GitLintTools,
} from '../../constants'

const configFilePaths = {
  eslint: 'eslint.config.js',
  prettier: 'prettier.config.js',
  commitlint: 'commitlint.config.js',
  lintStaged: 'lint-staged.config.js',
}

export const ESLINT_ESM_IMPORT_CONTENT = 'import { shlroland } from "@shlroland/eslint-config"'
export const ESLINT_CJS_IMPORT_CONTENT = 'const shlroland = require("@shlroland/eslint-config")'

export const PRETTIER_ESM_IMPORT_CONTENT = 'import shlroland from "@shlroland/prettier-config"'
export const PRETTIER_CJS_IMPORT_CONTENT = 'const shlroland = require("@shlroland/prettier-config")'

const esmConfigs: Record<ConfigChoice, ConfigOptions[]> = {
  [CodeLintTools.ESLINT_DEFAULT]: [{
    filePath: configFilePaths.eslint,
    importContent: ESLINT_ESM_IMPORT_CONTENT,
    exportContent: 'shlroland()',
  }],
  [CodeLintTools.ESLINT_NO_EXTERNAL]: [{
    filePath: configFilePaths.eslint,
    importContent: ESLINT_ESM_IMPORT_CONTENT,
    exportContent: 'shlroland({ formatters: false })',
  }],
  [CodeLintTools.ESLINT_NO_FORMATTER]: [{
    filePath: configFilePaths.eslint,
    importContent: ESLINT_ESM_IMPORT_CONTENT,
    exportContent: 'shlroland({ formatters: false, stylistic: false })',
  },
  ],
  [CodeLintTools.ESLINT_PRETTIER]: [
    {
      filePath: configFilePaths.eslint,
      importContent: ESLINT_ESM_IMPORT_CONTENT,
      exportContent: 'shlroland({ formatters: false, stylistic: false })',
    },
  ],
  [FormatTools.PRETTIER]: [
    {
      filePath: configFilePaths.prettier,
      importContent: PRETTIER_ESM_IMPORT_CONTENT,
      exportContent: 'shlroland()',
    },
  ],
  [GitLintTools.COMMITLINT]: [
    {
      filePath: configFilePaths.commitlint,
      importContent: '',
      exportContent: `{
        extends: ['@shlroland/commitlint-config']
    }`,
    },
  ],
  [GitLintTools.LINT_STAGED]: [
    {
      filePath: configFilePaths.lintStaged,
      importContent: 'import lintStaged from "@shlroland/lint-staged"',
      exportContent: `lintStaged`,
    },
  ],
  // [GitLintTools.HUSKY]: {
  //   filePath: configFilePaths.husky,
  //   importContent: 'import husky from "@shlroland/husky"',
  //   exportContent: `husky`,
  // },
}

const cjsConfigs: Record<ConfigChoice, ConfigOptions[]> = {
  [CodeLintTools.ESLINT_DEFAULT]: [{
    filePath: configFilePaths.eslint,
    importContent: ESLINT_CJS_IMPORT_CONTENT,
    exportContent: 'shlroland()',
  }],
  [CodeLintTools.ESLINT_NO_EXTERNAL]: [{
    filePath: configFilePaths.eslint,
    importContent: ESLINT_CJS_IMPORT_CONTENT,
    exportContent: 'shlroland({ formatters: false })',
  }],
  [CodeLintTools.ESLINT_NO_FORMATTER]: [{
    filePath: configFilePaths.eslint,
    importContent: ESLINT_CJS_IMPORT_CONTENT,
    exportContent: 'shlroland({ formatters: false, stylistic: false })',
  },
  ],
  [CodeLintTools.ESLINT_PRETTIER]: [
    {
      filePath: configFilePaths.eslint,
      importContent: ESLINT_CJS_IMPORT_CONTENT,
      exportContent: 'shlroland({ formatters: false, stylistic: false })',
    },
  ],
  [FormatTools.PRETTIER]: [
    {
      filePath: configFilePaths.prettier,
      importContent: PRETTIER_CJS_IMPORT_CONTENT,
      exportContent: 'shlroland()',
    },
  ],
  [GitLintTools.COMMITLINT]: [
    {
      filePath: configFilePaths.commitlint,
      importContent: '',
      exportContent: `{
        extends: ['@shlroland/commitlint-config']
    }`,
    },
  ],
  [GitLintTools.LINT_STAGED]: [
    {
      filePath: configFilePaths.lintStaged,
      importContent: 'const lintStaged = require("@shlroland/lint-staged")',
      exportContent: `lintStaged`,
    },
  ],
  // [GitLintTools.HUSKY]: {
  //   filePath: configFilePaths.husky,
  //   importContent: 'import husky from "@shlroland/husky"',
  //   exportContent: `husky`,
  // },
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

function deleteConfig(filePath: string) {
  return fs.unlink(filePath)
}

async function getModuleType(cwd: string) {
  const packageJsonPath = path.join(cwd, 'package.json')
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8')) as PackageJson
  return packageJson.type
}

export async function writeConfig(configs: CheckConfigResult[]) {
  const cwd = process.cwd()
  const moduleType = await getModuleType(cwd)

  for (const config of configs) {
    if (config.shouldOverride === true && config.exitedFilePath) {
      await deleteConfig(config.exitedFilePath)
    }

    if (moduleType === 'module') {
      await writeEsmConfig(cwd, config)
    }
    else {
      await writeCjsConfig(cwd, config)
    }

    // else {
    //   await writeCjsConfig(esmConfigs[config.choice])
    // }

    // const esmConfigs = esmConfigs[config.choice]
    // for (const esmConfig of esmConfigs) {
    //   const configFilePath = path.join(cwd, configContent.filePath)

    //   const configContent = esmConfigs[config.choice]
    //   await fs.writeFile(configFilePath, configContent)
    // }
    // const configFilePath = path.join(cwd, configFilePaths[config.choice])
    // const configContent = configContents[config.choice]
    // await fs.writeFile(configFilePath, configContent)
  }
}

async function writeEsmConfig(cwd: string, config: CheckConfigResult) {
  const esmConfig = esmConfigs[config.choice]
  for (const c of esmConfig) {
    const configFilePath = path.join(cwd, c.filePath)
    const content = esmConfigFactory(c.exportContent, c.importContent)
    await fs.writeFile(configFilePath, content)
  }
}

async function writeCjsConfig(cwd: string, config: CheckConfigResult) {
  const cjsConfig = cjsConfigs[config.choice]
  for (const c of cjsConfig) {
    const configFilePath = path.join(cwd, c.filePath)
    const content = cjsConfigFactory(c.exportContent, c.importContent)
    await fs.writeFile(configFilePath, content)
  }
}

export function getConfigFilesWillWriteList(answers: Answers) {
  const configFiles = new Set<string>()
  const { codeLintTools, gitLintTools } = answers
  const lintTools = [...codeLintTools, ...gitLintTools]
  for (const lintTool of lintTools) {
    switch (lintTool) {
      case CodeLintTools.ESLINT_DEFAULT:
      case CodeLintTools.ESLINT_NO_EXTERNAL:
      case CodeLintTools.ESLINT_NO_FORMATTER:
        configFiles.add(configFilePaths.eslint)
        break
      case CodeLintTools.ESLINT_PRETTIER:
        configFiles.add(configFilePaths.eslint)
        configFiles.add(configFilePaths.prettier)
        break
      case GitLintTools.COMMITLINT:
        configFiles.add(configFilePaths.commitlint)
        break
      case GitLintTools.LINT_STAGED:
        configFiles.add(configFilePaths.lintStaged)
        break
    }
  }
  return Array.from(configFiles).join(', ')
}
