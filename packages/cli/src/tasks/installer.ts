import type { Answers } from '../types'
import { parseNi, run } from '@antfu/ni'
import c from 'picocolors'
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

export async function install(answers: Answers) {
  const { lintTools } = answers
  const _pendingPkgs = lintTools.reduce((acc, tool) => {
    acc = [...acc, ...lintToolsPkgs[tool]]
    return acc
  }, [] as string[])

  const pendingPkgs = [...new Set(_pendingPkgs)]

  console.log(`${c.yellowBright('🛠️  will install packages')}:\n${c.cyanBright(pendingPkgs.join('\n'))}\n`)

  await run(parseNi, ['-D', ...pendingPkgs])
}
