/* eslint-disable ts/no-unused-expressions */
import c from 'picocolors'
import restoreCursor from 'restore-cursor'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { defaultInstallAnswers } from './constants'
import { configPrompt, installPrompt } from './prompts'
import { checkConfig } from './tasks/check-config'
import { defaultInstallPkgs, install } from './tasks/installer'
import { writeConfig } from './tasks/write-config'

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
        const answers = await installPrompt()
        await install(answers)
      }
      else {
        console.log(`${c.whiteBright('will install default packages')}: ${c.cyan(defaultInstallPkgs.join(' ,'))}`)
        await install(defaultInstallAnswers)
      }
    },
  )
  .command('config', 'config lint tool', (yargs) => {
    return yargs.option('interactive', {
      alias: 'I',
      type: 'boolean',
      description: 'Interactive selection of config to write',
    })
  }, async (argv) => {
    if (argv.interactive) {
      const answers = await configPrompt()
      const configResult = await checkConfig(answers)
      await writeConfig(configResult)
    }
  })
  .alias('v', 'version')
  .version(version)
  .help('h', 'help info')
  .argv

restoreCursor()
