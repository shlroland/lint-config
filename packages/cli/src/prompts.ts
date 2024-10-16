import * as p from '@clack/prompts'
import c from 'picocolors'
import { getAnswers } from './answer'
import { configTask } from './tasks/config'
import { installTask } from './tasks/install'
import { sleep } from './utils'

export async function commandInstallPrompt(): Promise<void> {
  console.clear()

  await sleep(500)

  p.intro(c.bgGreen(c.greenBright(`🧺 This command will install lint tools only but not config them.`)))

  await sleep(500)

  const selectedAnswers = await getAnswers()

  await installTask(selectedAnswers)

  p.outro(c.green(('🎉 All done!')))
}

export async function commandConfigPrompt(): Promise<void> {
  console.clear()

  await sleep(500)

  p.intro(c.bgBlack(c.bgBlackBright(`🧰 This command will config lint tools only but not install them.`)))

  await sleep(500)

  const selectedAnswers = await getAnswers()

  await configTask(selectedAnswers)

  p.outro(c.green('🎉 All done!'))
}

export async function commandInitPrompt() {
  await sleep(500)

  p.intro(c.bgMagenta(c.magentaBright(`🚀 This command will install lint tools and config them2.`)))

  await sleep(500)

  const selectedAnswers = await getAnswers()

  await installTask(selectedAnswers)

  await configTask(selectedAnswers)

  await sleep(500)

  p.outro(c.magentaBright('🎉 All done!'))
}
