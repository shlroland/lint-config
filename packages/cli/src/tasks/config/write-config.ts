import type { CheckConfigResult, ConfigValue } from '../../types'
import fs from 'node:fs/promises'
import path from 'node:path'
import { LintTools } from '../../constants'
import { notOverrideWarningPrompt } from '../../prompts'
import { deleteFile, getModuleType } from '../../utils'
import {
  configFilePaths,
  configsFactory,
  huskyConfigFilePaths,
} from './config-content'

export async function writeConfig(configs: CheckConfigResult[]) {
  const cwd = process.cwd()
  const moduleType = await getModuleType(cwd)
  const pendingConfigs = configsFactory(moduleType)

  for (const config of configs) {
    if (config.shouldOverride === true && config.exitedFilePath) {
      await deleteFile(config.exitedFilePath)
    }
    else if (config.shouldOverride === false) {
      await notOverrideWarningPrompt(config.moduleName)
      continue
    }

    const pendingConfig = pendingConfigs[config.moduleName]

    await writeConfigFile(cwd, pendingConfig)
  }
}

async function writeConfigFile(cwd: string, pendingConfig: ConfigValue) {
  if (pendingConfig.preInit) {
    const result = await pendingConfig.preInit()
    if (result === 'skip') {
      return
    }
  }

  for (const c of pendingConfig.options) {
    const configFilePath = path.join(cwd, c.filePath)

    await fs.writeFile(configFilePath, c.fileContent)
  }
}

export function getConfigFilesWillWriteList(configResult: CheckConfigResult[]) {
  const configFiles = new Set<string>()

  for (const { moduleName } of configResult) {
    switch (moduleName) {
      case LintTools.ESLINT:
        configFiles.add(configFilePaths.eslint)
        continue
      case LintTools.COMMITLINT_CZG:
        configFiles.add(configFilePaths.commitlint)
        continue
      case LintTools.LINT_STAGED:
        configFiles.add(configFilePaths.lintStaged)
        continue
      case LintTools.HUSKY:
        configFiles.add(huskyConfigFilePaths.preCommit)
        configFiles.add(huskyConfigFilePaths.commitMsg)
        continue
    }
  }
  return Array.from(configFiles)
}
