import { tsImport } from 'tsx/esm/api'

const { shlroland } = (await tsImport('./packages/eslint/index.ts', import.meta.url))

export default shlroland({
})
