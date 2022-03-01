import type { Linter } from 'eslint'

const config: Linter.BaseConfig = {
  extends: ['plugin:react/recommended', '@shlroland/eslint-config-ts'],
  settings: {
    react: {
      version: '17.0',
    },
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'react/react-in-jsx-scope': 'off',
  },
}

export default config
module.exports = config
