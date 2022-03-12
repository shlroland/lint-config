import type { Options } from 'execa'
import execa from 'execa'

export async function exec(cmd: string, options: Options = {}) {
  const [shell, ...args] = cmd.split(' ')
  const child = await execa(shell, args, { ...options })
  return child
}

export const installDep = async (dep: string) => {
  return exec(`pnpm i -D ${dep}`)
}
