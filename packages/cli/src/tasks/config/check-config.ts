import type { Answers, CheckConfigResult } from '../../types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { cosmiconfig } from 'cosmiconfig'
import c from 'picocolors'
import { LintTools } from '../../constants'
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

function checkEslint(): (forceConfig: boolean) => Promise<CheckConfigResult> {
  return async (forceConfig) => {
    const config = await ensureConfig('eslint')
    if (config) {
      const shouldOverride = await shouldOverridePrompt('eslint', forceConfig)
      return {
        shouldOverride,
        exitedFilePath: config.filepath,
        moduleName: LintTools.ESLINT,
      }
    }

    return {
      moduleName: LintTools.ESLINT,
      shouldOverride: 'none',
    }
  }
}

function checkCommitlint(): (forceConfig: boolean) => Promise<CheckConfigResult> {
  return async (forceConfig) => {
    const config = await ensureConfig('commitlint')
    if (config) {
      const shouldOverride = await shouldOverridePrompt('commitlint', forceConfig)
      return {
        moduleName: LintTools.COMMITLINT_CZG,
        shouldOverride,
        exitedFilePath: config.filepath,
      }
    }

    return {
      moduleName: LintTools.COMMITLINT_CZG,
      shouldOverride: 'none',
    }
  }
}

function checkLintStaged(): (forceConfig: boolean) => Promise<CheckConfigResult> {
  return async (forceConfig) => {
    const config = await ensureConfig('lint-staged') || await ensureConfig('lintstaged')
    if (config) {
      const shouldOverride = await shouldOverridePrompt('lint-staged', forceConfig)
      return {
        moduleName: LintTools.LINT_STAGED,
        shouldOverride,
        exitedFilePath: config.filepath,
      }
    }

    return {
      moduleName: LintTools.LINT_STAGED,
      shouldOverride: 'none',
    }
  }
}

function checkHusky(): (forceConfig: boolean) => Promise<CheckConfigResult> {
  return async (forceConfig) => {
    const huskyDir = path.resolve(process.cwd(), '.husky')
    const exists = await fs.promises.access(huskyDir).then(() => true).catch(() => false)
    return {
      moduleName: LintTools.HUSKY,
      shouldOverride: exists ? await shouldOverridePrompt('husky', forceConfig) : 'none',
    } as const
  }
}

const lintToolsConfigs = {
  [LintTools.ESLINT]: [checkEslint()],
  [LintTools.COMMITLINT_CZG]: [checkCommitlint()],
  [LintTools.LINT_STAGED]: [checkLintStaged()],
  [LintTools.HUSKY]: [checkHusky()],
}

export async function checkConfig(answers: Answers, forceConfig = false) {
  const { lintTools } = answers

  const lintToolConfigs = lintTools.reduce((acc, tool) => {
    acc = [...acc, ...(lintToolsConfigs[tool] ?? [])]
    return acc
  }, [] as ((forceConfig: boolean) => Promise<CheckConfigResult>)[])

  const tools = [...lintToolConfigs]
  const results: CheckConfigResult[] = []
  for (const tool of tools) {
    const result = await tool(forceConfig)
    if (result.shouldOverride !== false) {
      results.push({ ...result })
    }
  }
  return results
}
