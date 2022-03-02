import { ensureArray } from './helpers'

export interface ContextualLinterFn {
  (filenames: string[], commands: string[]): string[]
}

export interface CombinableLinterFn {
  (next: ContextualLinterFn): ContextualLinterFn
}

export interface LinterFn {
  (filenames: string[]): string | string[]
}

export interface WrapFn {
  (linterFn: LinterFn): CombinableLinterFn
}

export const finish: ContextualLinterFn = (_filename, commands) => commands

export const wrap: WrapFn = (fn) => (next) => (filenames, commands) =>
  ensureArray(next(filenames, ensureArray(commands))).concat(fn(filenames))
