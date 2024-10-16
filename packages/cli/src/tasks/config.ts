import type { AbstractAnswer } from '../answer/abstract/answer'
import * as p from '@clack/prompts'
import c from 'picocolors'
import { writeFile } from '../utils'

export async function configTask(selectedAnswers: AbstractAnswer[]) {
  p.log.step(c.cyan('🛠️  Config lint tools step'))

  for (const answer of selectedAnswers) {
    await answer.configGuard()
  }

  const pendingConfigs = selectedAnswers.map(answer => answer.pendingConfigs).flat()

  for (const { configFilePath, configFileContent, overrideFile } of pendingConfigs) {
    await overrideFile()
    await writeFile(configFilePath, configFileContent)
  }

  p.log.step(c.green('🥳 Config lint tools successfully.'))
}
