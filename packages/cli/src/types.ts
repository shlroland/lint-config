import type { LintTools } from './constants'

export interface Answers {
  lintTools: LintTools[]
}

export type ConfigChoice =
  | LintTools.ESLINT
  | LintTools.COMMITLINT_CZG
  | LintTools.LINT_STAGED
  | LintTools.HUSKY

export interface CheckConfigResult {
  moduleName: ConfigChoice
  shouldOverride: boolean | 'none'
  exitedFilePath?: string
}

export interface ConfigOptions {
  filePath: string
  fileContent: string
}

export type Configs = Record<ConfigChoice, {
  preInit?: () => Promise<void | 'skip'>
  options: ConfigOptions[]
}>
