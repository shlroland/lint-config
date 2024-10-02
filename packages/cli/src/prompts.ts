import type { Answers } from './types'
import inquirer from 'inquirer'
import { CodeLintTools, GitLintTools } from './constants'

export async function installPrompt(): Promise<Answers> {
  return await inquirer
    .prompt([
      {
        type: 'select',
        name: 'codeLintTools',
        message:
        'Please select the linter and formatter tool to install:',
        choices: [
          {
            name: 'eslint (default)',
            value: CodeLintTools.ESLINT_DEFAULT,
            description:
            'will install eslint with stylistic rules and external formatters',
          },
          {
            name: 'eslint (no external)',
            value: CodeLintTools.ESLINT_NO_EXTERNAL,
            description:
            'will install eslint without no external formatters',
          },
          {
            name: 'eslint (no formatter)',
            value: CodeLintTools.ESLINT_NO_FORMATTER,
            description:
            'will install eslint without stylistic and formatters',
          },
          {
            name: 'eslint and prettier',
            value: CodeLintTools.ESLINT_PRETTIER,
            description:
            'will install eslint without stylistic rules and prettier as formatter',
          },
        ],
      },
      {
        type: 'checkbox',
        name: 'gitLintTools',
        message: 'Please select the git related lint tools to install:',
        choices: [
          { name: 'commitlint', value: GitLintTools.COMMITLINT, checked: true },
          { name: 'czg', value: GitLintTools.CZG, checked: true },
          { name: 'lint-staged', value: GitLintTools.LINT_STAGED, checked: true },
          { name: 'husky', value: GitLintTools.HUSKY, checked: true },
        ],
      },
    ])
}

export async function configPrompt() {
  return await inquirer.prompt([
    {
      type: 'list',
      name: 'codeLintTools',
      message: 'Please select the linter and formatter tool to config:',
      choices: [
        { name: 'eslint (default)', value: CodeLintTools.ESLINT_DEFAULT },
        { name: 'eslint (no external)', value: CodeLintTools.ESLINT_NO_EXTERNAL },
        { name: 'eslint (no formatter)', value: CodeLintTools.ESLINT_NO_FORMATTER },
        { name: 'eslint and prettier', value: CodeLintTools.ESLINT_PRETTIER },
      ],
    },
    {
      type: 'checkbox',
      name: 'gitLintTools',
      message: 'Please select the git related lint tools to config:',
      choices: [
        { name: 'commitlint', value: GitLintTools.COMMITLINT, checked: true },
        { name: 'lint-staged', value: GitLintTools.LINT_STAGED, checked: true },
      ],
    },
  ])
}

export async function shouldConfigPrompt(): Promise<'accept-all' | 'accept-some' | 'reject-all'> {
  const { shouldConfig } = await inquirer.prompt([
    {
      type: 'select',
      name: 'shouldConfig',
      message: 'Do you want to config lint tools?',
      choices: [
        { name: 'Accept all', value: 'accept-all', description: 'Configure based on the installed tools.' },
        { name: 'Accept some', value: 'accept-some', description: 'Select which tools to configure.' },
        { name: 'Reject all', value: 'reject-all', description: 'Do not configure any tools.' },
      ],
      default: 'accept-all',
    },
  ])

  return shouldConfig
}

export async function shouldOverridePrompt(tool: string) {
  const { shouldOverride } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldOverride',
      message: `${tool} configuration already exists, do you want to override it?`,
      default: true,
    },
  ])

  return !!shouldOverride
}

// export
