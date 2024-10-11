import type { Answers } from '../../types'
import c from 'picocolors'
import { checkConfig } from './check-config'
import { getConfigFilesWillWriteList, writeConfig } from './write-config'

export async function config(answers: Answers, forceConfig = false) {
  const configResult = await checkConfig(answers, forceConfig)
  console.log(`${c.yellowBright('📦 will config default lint tool')}:\n${c.cyan(getConfigFilesWillWriteList(configResult))}\n`)
  await writeConfig(configResult)
}
