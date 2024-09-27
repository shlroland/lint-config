export enum CodeLintTools {
  ESLINT_DEFAULT = 'eslint-default',
  ESLINT_NO_EXTERNAL = 'eslint-no-external',
  ESLINT_NO_FORMATTER = 'eslint-no-formatter',
  ESLINT_PRETTIER = 'eslint-prettier',
}

export enum GitLintTools {
  COMMITLINT = 'commitlint',
  CZG = 'czg',
  LINT_STAGED = 'lint-staged',
  HUSKY = 'husky',
}

export enum FormatTools {
  PRETTIER = 'prettier',
}

export enum ShouldOverride {
  YES = 'yes',
  NO = 'no',
}

export const defaultInstallAnswers = {
  codeLintTools: CodeLintTools.ESLINT_DEFAULT,
  gitLintTools: [GitLintTools.COMMITLINT, GitLintTools.CZG, GitLintTools.LINT_STAGED, GitLintTools.HUSKY],
}

export const configFilePaths = {
  [CodeLintTools.ESLINT_DEFAULT]: 'eslint.config.js',
  [CodeLintTools.ESLINT_NO_EXTERNAL]: 'eslint.config.js',
  [CodeLintTools.ESLINT_NO_FORMATTER]: 'eslint.config.js',
  [CodeLintTools.ESLINT_PRETTIER]: 'eslint.config.js',
  [FormatTools.PRETTIER]: 'prettier.config.js',
  [GitLintTools.COMMITLINT]: 'commitlint.config.js',
  [GitLintTools.CZG]: 'czg.config.js',
  [GitLintTools.LINT_STAGED]: 'lint-staged.config.js',
  [GitLintTools.HUSKY]: 'husky.config.js',
}
