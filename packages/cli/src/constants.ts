export enum LintTools {
  ESLINT = 'eslint',
  COMMITLINT_CZG = 'commitlint-czg',
  LINT_STAGED = 'lint-staged',
  HUSKY = 'husky',
}

export enum ShouldOverride {
  YES = 'yes',
  NO = 'no',
}

export const defaultConfigAnswers = {
  lintTools: [LintTools.ESLINT, LintTools.COMMITLINT_CZG, LintTools.LINT_STAGED, LintTools.HUSKY],
}
