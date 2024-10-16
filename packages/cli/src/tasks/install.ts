import type { AbstractAnswer } from '../answer/abstract/answer'
import * as p from '@clack/prompts'
import c from 'picocolors'
import { install, willInstallList } from '../utils'

export async function installTask(selectedAnswers: AbstractAnswer[]) {
  p.log.step(c.cyan('📦  Install lint tools step'))

  const pendingPkgs = selectedAnswers.map(answer => answer.pendingPackages).flat()

  willInstallList(pendingPkgs)

  await install(pendingPkgs)

  p.log.step(c.green('😋 Install lint tools successfully.'))
}
