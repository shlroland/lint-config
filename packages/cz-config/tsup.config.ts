import { defineConfig } from 'tsup'
import { config } from '../../tsup.config'

export default defineConfig(
  config({
    entry: ['src/index.ts', 'src/czg.ts', 'src/commitlint.ts'],
    esbuildOptions: (options) => {
      options.charset = 'utf8'
    },
    splitting: true,
  }),
)
