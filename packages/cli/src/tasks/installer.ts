import type { Answers } from '../types'
import { parseNi, run } from '@antfu/ni'
import { CodeLintTools, GitLintTools } from '../enum'

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

export async function install(answers: Answers) {
  const { codeLintTools, gitLintTools } = answers
  const codeLintTool = codeLintToolsPkgs[codeLintTools]
  const gitLintTool = gitLintTools.reduce((acc, tool) => {
    acc = [...acc, ...gitLintToolsPkgs[tool]]
    return acc
  }, [] as string[])

  const tools = [...codeLintTool, ...gitLintTool]
  await run(parseNi, ['-D', ...tools])
}
