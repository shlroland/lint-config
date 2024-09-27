#!/usr/bin/env node
/* eslint-disable ts/no-unused-expressions */

import inquirer from 'inquirer'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { CodeLintTools, GitLintTools } from './enum'
import { install } from './tasks/installer'

yargs(hideBin(process.argv))
  .scriptName('shlroland-lint')
  .command(
    '$0',
    'cli tool to setup lint tool',
    (yargs) => {
      return yargs.option('interactive', {
        alias: 'I',
        type: 'boolean',
        description: 'Interactive selection of packages to install',
      })
    },
    async (argv) => {
      if (argv.interactive) {
        const answers = await inquirer
          .prompt([
            {
              type: 'list',
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
        install(answers)
      }
      else {
        console.log('no interactive')
        // installPackages('all')
      }
    },
  )
  .alias('v', 'version')
  .version(version)
  .help('h', 'help info')
  .argv
