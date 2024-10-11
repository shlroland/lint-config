import type { CheckConfigResult } from '../../types'
import fs from 'node:fs/promises'
import path from 'node:path'
import { LintTools } from '../../constants'
import { deleteFile, getModuleType } from '../../utils'
import {
  configFilePaths,
  configsFactory,
  huskyConfigFilePaths,
} from './config-content'

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
  const configs = configsFactory(moduleType)
  const pendingConfig = configs[config.moduleName]
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
  return Array.from(configFiles).join('\n')
}
