import { defineConfig } from 'tsup'
import { config } from '../../tsup.config'

export default defineConfig(
  config({
    esbuildOptions: (options) => {
      options.charset = 'utf8'
    },
  }),
)
