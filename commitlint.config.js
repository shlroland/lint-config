import { tsImport } from 'tsx/esm/api'

const config = (await tsImport('./packages/cz-config/src/gitmoji/index.ts', import.meta.url)).default

export default config
