export interface HookItem {
  name: string
  content: string
}

export interface Config {
  hooks: Record<string, HookItem[]>
}

const config: Config = {
  hooks: {
    'commit-msg': [
      { name: 'commitlint', content: `npx --no -- commitlint --edit "\${1}"` },
    ],
    'pre-commit': [{ name: 'lint-staged', content: 'lint-staged' }],
  },
}

export default config
module.exports = config
