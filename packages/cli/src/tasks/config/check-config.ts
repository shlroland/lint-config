import type { Answers, CheckConfigResult } from '../../types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { cosmiconfig } from 'cosmiconfig'
import c from 'picocolors'
import { CodeLintTools, FormatTools, GitLintTools } from '../../constants'
import { shouldOverridePrompt } from '../../prompts'

async function ensureConfig(moduleName: string) {
  try {
    const explorer = cosmiconfig(moduleName)
    const result = await explorer.search()
    return result
  }
  catch (error) {
    if (error instanceof Error) {
      const isCjsOrEsmError = isPackageModuleError(error)
      if (isCjsOrEsmError) {
        console.log(`${c.redBright(`So bad`)} 😞! 

        You may have mismatched the value of the ${c.yellowBright(`"type"`)} field in ${c.greenBright('package.json')} and the export format of the ${c.blueBright(moduleName)} configuration file. 

        Please check your ${c.greenBright('package.json')} and ${c.blueBright(moduleName)} configuration file.
        `)
        process.exit(10)
      }
      throw error
    }
  }
}

const commonjsError = [
  'Unexpected token \'export\'',
  'SyntaxError: Cannot use import statement outside a module',
]
const esmError = 'module is not defined in ES module scope'

function isPackageModuleError(error: Error) {
  return commonjsError.some(msg => error.message.includes(msg)) || error.message.includes(esmError)
}

function checkEslint(choice: CodeLintTools): () => Promise<CheckConfigResult> {
  return async () => {
    const config = await ensureConfig('eslint')
    if (config) {
      const shouldOverride = await shouldOverridePrompt('eslint')
      return {
        moduleName: 'eslint',
        shouldOverride,
        exitedFilePath: config.filepath,
        choice,
      }
    }

    return {
      moduleName: 'eslint',
      shouldOverride: 'none',
      choice,
    }
  }
}

function checkPrettier(choice: FormatTools): () => Promise<CheckConfigResult> {
  return async () => {
    const config = await ensureConfig('prettier')
    if (config) {
      const shouldOverride = await shouldOverridePrompt('prettier')
      return {
        moduleName: 'prettier',
        shouldOverride,
        exitedFilePath: config.filepath,
        choice,
      }
    }

    return {
      moduleName: 'prettier',
      shouldOverride: 'none',
      choice,
    }
  }
}

function checkCommitlint(): () => Promise<CheckConfigResult> {
  return async () => {
    const config = await ensureConfig('commitlint')
    if (config) {
      const shouldOverride = await shouldOverridePrompt('commitlint')
      return {
        moduleName: 'commitlint',
        shouldOverride,
        exitedFilePath: config.filepath,
        choice: GitLintTools.COMMITLINT,
      }
    }

    return {
      moduleName: 'commitlint',
      shouldOverride: 'none',
      choice: GitLintTools.COMMITLINT,
    }
  }
}

function checkLintStaged(): () => Promise<CheckConfigResult> {
  return async () => {
    const config = await ensureConfig('lint-staged') || await ensureConfig('lintstaged')
    if (config) {
      const shouldOverride = await shouldOverridePrompt('lint-staged')
      return {
        moduleName: 'lint-staged',
        shouldOverride,
        exitedFilePath: config.filepath,
        choice: GitLintTools.LINT_STAGED,
      }
    }

    return {
      moduleName: 'lint-staged',
      shouldOverride: 'none',
      choice: GitLintTools.LINT_STAGED,
    }
  }
}

function checkHusky() {
  return async () => {
    const huskyDir = path.resolve(process.cwd(), '.husky')
    const exists = await fs.promises.access(huskyDir).then(() => true).catch(() => false)
    return {
      moduleName: 'husky',
      shouldOverride: exists ? await shouldOverridePrompt('husky') : 'none',
      choice: GitLintTools.HUSKY,
    } as const
  }
}

const codeLintToolsPkgs = {
  [CodeLintTools.ESLINT_DEFAULT]: [checkEslint(CodeLintTools.ESLINT_DEFAULT)],
  [CodeLintTools.ESLINT_NO_EXTERNAL]: [checkEslint(CodeLintTools.ESLINT_NO_EXTERNAL)],
  [CodeLintTools.ESLINT_NO_FORMATTER]: [checkEslint(CodeLintTools.ESLINT_NO_FORMATTER)],
  [CodeLintTools.ESLINT_PRETTIER]: [checkEslint(CodeLintTools.ESLINT_PRETTIER), checkPrettier(FormatTools.PRETTIER)],
}

const gitLintToolsPkgs = {
  [GitLintTools.COMMITLINT]: [checkCommitlint()],
  [GitLintTools.LINT_STAGED]: [checkLintStaged()],
  [GitLintTools.CZG]: [],
  [GitLintTools.HUSKY]: [checkHusky()],
}

export async function checkConfig(answers: Answers) {
  const { codeLintTools, gitLintTools } = answers
  const codeLintTool = codeLintToolsPkgs[codeLintTools]
  const gitLintTool = gitLintTools.reduce((acc, tool) => {
    acc = [...acc, ...(gitLintToolsPkgs[tool] ?? [])]
    return acc
  }, [] as (() => Promise<CheckConfigResult>)[])

  const tools = [...codeLintTool, ...gitLintTool]
  const results: CheckConfigResult[] = []
  for (const tool of tools) {
    const result = await tool()
    if (result.shouldOverride !== false) {
      results.push({ ...result })
    }
  }
  return results
}
