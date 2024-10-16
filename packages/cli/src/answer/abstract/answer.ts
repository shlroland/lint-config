import type { Config } from './config'
import type { Installer } from './install'
import { deleteFile, shouldOverridePrompt } from '../../utils'

export abstract class AbstractAnswer {
  static toolName: string

  abstract answerName: string

  abstract installer: Installer

  abstract config: Config

  async configGuard(): Promise<void> {
    const configs = this.config.pendingConfigs
    for (const config of configs) {
      if (await config.checkConfigFileExisted()) {
        const shouldOverride = await shouldOverridePrompt(this.answerName)
        if (shouldOverride) {
          config.overrideFile = async () => {
            await deleteFile(config.configFilePath)
          }
          this.config.addPendingConfig(config)
        }
        else {
          this.config.removePendingConfig(config)
        }
      }
    }
  }

  get pendingPackages(): string[] {
    return this.installer.pendingPackages
  }

  get pendingConfigs(): { configFilePath: string, configFileContent: string, overrideFile: () => Promise<void> }[] {
    const result: { configFilePath: string, configFileContent: string, overrideFile: () => Promise<void> }[] = []

    for (const config of this.config.pendingConfigs) {
      result.push({
        configFilePath: config.configFilePath,
        configFileContent: config.configFileContent,
        overrideFile: config.overrideFile,
      })
    }

    return result
  }
}
