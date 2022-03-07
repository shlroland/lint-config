import type { Options } from 'execa';
export declare const exec: (cmd: string, options?: Options) => Promise<import("execa").ExecaReturnValue<string>>;
export declare const installDep: (dep: string) => Promise<import("execa").ExecaReturnValue<string>>;
