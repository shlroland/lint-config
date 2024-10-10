import type { CodeLintTools, FormatTools, GitLintTools } from './constants'

export interface Answers {
  codeLintTools: CodeLintTools
  gitLintTools: GitLintTools[]
}

export type ConfigChoice =
  | CodeLintTools.ESLINT_DEFAULT
  | CodeLintTools.ESLINT_NO_EXTERNAL
  | CodeLintTools.ESLINT_NO_FORMATTER
  | CodeLintTools.ESLINT_PRETTIER
  | GitLintTools.HUSKY
  | GitLintTools.COMMITLINT
  | GitLintTools.LINT_STAGED
  | FormatTools.PRETTIER

export interface CheckConfigResult {
  moduleName: string
  shouldOverride: boolean | 'none'
  exitedFilePath?: string
  choice: ConfigChoice
}

export interface ConfigOptions {
  filePath: string
  importContent: string
  exportContent: string
}

export type Configs = Record<ConfigChoice, {
  preInit?: () => Promise<void | 'skip'>
  options: ConfigOptions[]
}>
