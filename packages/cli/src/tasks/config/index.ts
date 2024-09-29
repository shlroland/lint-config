import type { Answers } from '../../types'
import { checkConfig } from './check-config'
import { writeConfig } from './write-config'

export async function config(answers: Answers) {
  const configResult = await checkConfig(answers)
  await writeConfig(configResult)
}
