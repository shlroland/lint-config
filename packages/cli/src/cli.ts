/* eslint-disable ts/no-unused-expressions */
import restoreCursor from 'restore-cursor'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { defaultConfigAnswers } from './constants'
import { configPrompt, installPrompt, shouldConfigPrompt } from './prompts'
import { config } from './tasks/config'
import { install } from './tasks/installer'

yargs(hideBin(process.argv))
  .scriptName('shlroland-lint')
  .command(
    ['$0', '$0 init'],
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
        const shouldConfig = await shouldConfigPrompt()
        if (shouldConfig === 'accept-all') {
          await config(answers)
        }
        else if (shouldConfig === 'accept-some') {
          const configAnswers = await configPrompt()
          await config(configAnswers)
        }
      }
      else {
        await install(defaultConfigAnswers)
        await config(defaultConfigAnswers)
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
      await config(answers)
    }
  })
  .alias('v', 'version')
  .version(version)
  .help('h', 'help info')
  .argv

restoreCursor()
