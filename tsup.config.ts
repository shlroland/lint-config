import type { Options } from 'tsup'

export function config(options?: Options) {
  return {
    entry: ['index.ts'],
    format: ['esm', 'cjs'],
    outDir: 'lib',
    dts: true,
    clean: true,
    ...options,
  } satisfies Options
}
