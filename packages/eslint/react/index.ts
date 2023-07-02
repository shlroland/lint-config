const config = {
  extends: ['plugin:react/recommended', '@shlroland/eslint-config-ts'],
  plugins: ['react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
}

export default config
module.exports = config
