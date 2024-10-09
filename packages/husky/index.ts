const config = {
  hooks: {
    'commit-msg': 'npx --no -- commitlint --edit $1' as const,
    'pre-commit': 'lint-staged' as const,
  },
}

export default config
