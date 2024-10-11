export enum LintTools {
  ESLINT = 'eslint',
  COMMITLINT = 'commitlint',
  CZG = 'czg',
  LINT_STAGED = 'lint-staged',
  HUSKY = 'husky',
}

export enum ShouldOverride {
  YES = 'yes',
  NO = 'no',
}

export const defaultConfigAnswers = {
  lintTools: [LintTools.ESLINT, LintTools.CZG, LintTools.LINT_STAGED, LintTools.HUSKY],
}
