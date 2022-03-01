import type { Linter } from 'eslint'

const config: Linter.BaseConfig = {
  extends: ['@shlroland/eslint-config-react', '@shlroland/eslint-config-vue'],
}

export default config
module.exports = config
