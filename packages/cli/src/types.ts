import type { CodeLintTools, FormatTools, GitLintTools } from './constants'

export interface Answers {
  codeLintTools: CodeLintTools
  gitLintTools: GitLintTools[]
}

export interface CheckConfigResult {
  moduleName: string
  shouldOverride: boolean | 'none'
  exitedFilePath?: string
  choice: CodeLintTools | GitLintTools | FormatTools
}
