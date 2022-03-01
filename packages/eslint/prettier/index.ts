import type { Linter } from 'eslint'

const config: Linter.BaseConfig = {
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'all', semi: false },
    ],
  },
}

export default config
module.exports = config
