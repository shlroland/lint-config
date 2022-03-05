const config = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS' as const,
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true' as const,
    'pre-commit': 'lint-staged' as const,
  },
}

export default config
module.exports = config
