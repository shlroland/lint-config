import type { CodeLintTools, GitLintTools } from './enum'

export interface Answers {
  codeLintTools: CodeLintTools
  gitLintTools: GitLintTools[]
}
