import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm','cjs'],
  outDir: 'lib',
  dts: true,
  clean: true,
})
