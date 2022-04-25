import type { Options } from 'execa'
import execa from 'execa'
import type { ClientType } from '../types'
export declare function exec(
  cmd: string,
  options?: Options,
): Promise<execa.ExecaReturnValue<string>>
export declare const installDep: (
  client: ClientType,
  dep: string,
) => Promise<execa.ExecaReturnValue<string>>
