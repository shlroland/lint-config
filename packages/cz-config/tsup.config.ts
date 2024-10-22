import { defineConfig } from 'tsup'
import { config } from '../../tsup.config'

export default defineConfig(
  config({
    entry: ['src/index.ts', 'src/gitmoji.ts', 'src/conventional.ts'],
    esbuildOptions: (options) => {
      options.charset = 'utf8'
    },
    splitting: true,
  }),
)
