import huskyConfig from '@shlroland/husky-config'
import { deleteFile, initGit, initHusky, isGitRepository, isHuskyInstalled, shouldInitGitPrompt, shouldOverridePrompt } from '../utils'
import { AbstractAnswer } from './abstract/answer'
import { Config } from './abstract/config'
import { CommonConfigOption } from './abstract/config-option'
import { AnswerContext } from './abstract/context'
import { Installer } from './abstract/install'

export class HuskyAnswer extends AbstractAnswer {
  static toolName = 'husky'

  context = AnswerContext.instance

  answerName = 'husky'

  installer = new Installer(['husky'])

  config = new Config([
    new CommonConfigOption({
      configFileName: '.husky/pre-commit',
      content: huskyConfig.hooks['pre-commit'],
    }),
    new CommonConfigOption({
      configFileName: '.husky/commit-msg',
      content: huskyConfig.hooks['commit-msg'],
    }),
  ])

  async configGuard(): Promise<void> {
    const hasGit = await isGitRepository(this.context.cwd)
    if (!hasGit) {
      const shouldInitGit = await shouldInitGitPrompt()
      if (!shouldInitGit) {
        this.config.clearPendingConfigs()
        return
      }
      await initGit()
    }

    const hasHusky = await isHuskyInstalled(this.context.cwd)
    if (!hasHusky) {
      await initHusky()
    }

    const configs = this.config.pendingConfigs
    for (const config of configs) {
      if (await config.checkConfigFileExisted()) {
        const shouldOverride = await shouldOverridePrompt(config.configFileName)
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
}
