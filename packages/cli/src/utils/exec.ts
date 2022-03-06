import type { Options } from 'execa'
import { execa } from 'execa'
import type { DepWithVersion } from './types'

export const exec = async (cmd: string, options: Options = {}) => {
  const [shell, ...args] = cmd.split(' ')
  const child = await execa(shell, args, { ...options })
  return child
}

export const installDep = async (dep: DepWithVersion) => {
  return exec(`pnpm i -D ${dep}`)
}
