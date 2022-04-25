import type { Options } from 'execa'
import execa from 'execa'
import type { ClientType } from '../types'
import { detectClientInstall } from './detectClient'

export async function exec(cmd: string, options: Options = {}) {
  const [shell, ...args] = cmd.split(' ')
  const child = await execa(shell, args, { ...options })
  return child
}

export const installDep = async (client: ClientType, dep: string) => {
  const installCmd = detectClientInstall(client)
  return exec(`${installCmd} -D ${dep}`)
}
