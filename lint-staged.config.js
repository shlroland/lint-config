import { tsImport } from 'tsx/esm/api'

const config = (await tsImport('./packages/lint-staged/index.ts', import.meta.url)).default

export default config
