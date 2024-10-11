import type { Answers } from './types'
import inquirer from 'inquirer'
import { LintTools } from './constants'

export async function installPrompt(): Promise<Answers> {
  return await inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'lintTools',
        message: 'Please select lint tools to install:',
        choices: [
          { name: 'eslint', value: LintTools.ESLINT, checked: true },
          { name: 'commitlint and czg', value: LintTools.COMMITLINT_CZG, checked: true },
          { name: 'lint-staged', value: LintTools.LINT_STAGED, checked: true },
          { name: 'husky', value: LintTools.HUSKY, checked: true },
        ],
      },
    ])
}

export async function configPrompt() {
  return await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'lintTools',
      message: 'Please select the lint tools to config:',
      choices: [
        { name: 'commitlint and czg', value: LintTools.COMMITLINT_CZG, checked: true },
        { name: 'lint-staged', value: LintTools.LINT_STAGED, checked: true },
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

export async function shouldOverridePrompt(tool: string, forceConfig = false) {
  if (forceConfig) {
    return true
  }

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

export async function shouldInitGitPrompt() {
  const { shouldInitGit } = await inquirer.prompt<{ shouldInitGit: boolean }>(
    [
      {
        type: 'confirm',
        name: 'shouldInitGit',
        message: 'Current directory is not a git repository, do you want to initialize it?',
        default: true,
      },
    ],
  )

  return shouldInitGit
}
