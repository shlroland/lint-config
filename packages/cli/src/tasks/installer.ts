import { parseNi, run } from '@antfu/ni'
import { LintTools } from '../constants'

const lintToolsPkgs = {
  [LintTools.ESLINT]: ['eslint', '@shlroland/eslint-config', 'eslint-plugin-format'],
  [LintTools.COMMITLINT_CZG]: ['czg', '@shlroland/cz-config'],
  [LintTools.LINT_STAGED]: ['lint-staged', '@shlroland/lint-staged'],
  [LintTools.HUSKY]: ['husky'],
}

export const defaultInstallPkgs = [
  ...lintToolsPkgs[LintTools.ESLINT],
  ...lintToolsPkgs[LintTools.COMMITLINT_CZG],
  ...lintToolsPkgs[LintTools.LINT_STAGED],
  ...lintToolsPkgs[LintTools.HUSKY],
]

export async function getPendingPkgs(lintTools: LintTools[]) {
  const _pendingPkgs = lintTools.reduce((acc, tool) => {
    acc = [...acc, ...lintToolsPkgs[tool]]
    return acc
  }, [] as string[])

  return [...new Set(_pendingPkgs)]
}

export async function install(pendingPkgs: string[]) {
  await run(parseNi, ['-D', ...pendingPkgs], { programmatic: true })
}
