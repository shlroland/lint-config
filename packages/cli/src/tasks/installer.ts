import type { Answers } from '../types'
import { parseNi, run } from '@antfu/ni'
import c from 'picocolors'
import { CodeLintTools, GitLintTools } from '../constants'

const codeLintToolsPkgs = {
  [CodeLintTools.ESLINT_DEFAULT]: ['eslint', '@shlroland/eslint-config'],
  [CodeLintTools.ESLINT_NO_EXTERNAL]: ['eslint', '@shlroland/eslint-config'],
  [CodeLintTools.ESLINT_NO_FORMATTER]: ['eslint', '@shlroland/eslint-config'],
  [CodeLintTools.ESLINT_PRETTIER]: ['eslint', '@shlroland/eslint-config', 'prettier', '@shlroland/prettier-config'],
}

const gitLintToolsPkgs = {
  [GitLintTools.COMMITLINT]: ['commitlint', '@shlroland/commitlint-config'],
  [GitLintTools.CZG]: ['czg'],
  [GitLintTools.LINT_STAGED]: ['lint-staged'],
  [GitLintTools.HUSKY]: ['husky'],
}

export const defaultInstallPkgs = [
  ...codeLintToolsPkgs[CodeLintTools.ESLINT_DEFAULT],
  ...gitLintToolsPkgs[GitLintTools.COMMITLINT],
  ...gitLintToolsPkgs[GitLintTools.CZG],
  ...gitLintToolsPkgs[GitLintTools.LINT_STAGED],
  ...gitLintToolsPkgs[GitLintTools.HUSKY],
]

export async function install(answers: Answers) {
  const { codeLintTools, gitLintTools } = answers
  const codeLintTool = codeLintToolsPkgs[codeLintTools]
  const gitLintTool = gitLintTools.reduce((acc, tool) => {
    acc = [...acc, ...gitLintToolsPkgs[tool]]
    return acc
  }, [] as string[])

  const tools = [...codeLintTool, ...gitLintTool]
  console.log(`${c.whiteBright('will install packages')}: ${c.greenBright(tools.join(' ,'))}\n`)
  await run(parseNi, ['-D', ...tools])
}
