const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'scope-case': [0],
  },
}

export default config
module.exports = config
