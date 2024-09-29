/* eslint-disable ts/no-unused-expressions */
import c from 'picocolors'
import restoreCursor from 'restore-cursor'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { defaultConfigAnswers } from './constants'
import { configPrompt, installPrompt, shouldConfigPrompt } from './prompts'
import { config } from './tasks/config'
import { getConfigFilesWillWriteList } from './tasks/config/write-config'
import { defaultInstallPkgs, install } from './tasks/installer'

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
        console.log(`${c.whiteBright('will install default packages')}: \n ${c.cyan(defaultInstallPkgs.join(' ,'))}`)
        await install(defaultConfigAnswers)
        console.log(`${c.whiteBright('will config default lint tool')}: \n ${c.cyan(getConfigFilesWillWriteList(defaultConfigAnswers))}`)
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
