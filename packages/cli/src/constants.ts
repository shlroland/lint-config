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
