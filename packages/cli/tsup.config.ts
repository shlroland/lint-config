import { defineConfig } from 'tsup'
import { config } from '../../tsup.config'

export default defineConfig(
  config({
    entry: ['src/cli.ts'],
    format: ['esm'],
    outDir: 'dist',
  }),
)
