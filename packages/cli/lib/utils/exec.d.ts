import type { Options } from 'execa'
import execa from 'execa'
export declare function exec(
  cmd: string,
  options?: Options,
): Promise<execa.ExecaReturnValue<string>>
export declare const installDep: (
  dep: string,
) => Promise<execa.ExecaReturnValue<string>>
