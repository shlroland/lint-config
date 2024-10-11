import { tsImport } from 'tsx/esm/api'

const config = (await tsImport('./packages/cz/src/commitlint.ts', import.meta.url)).default

export default config
