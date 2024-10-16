import process from 'node:process'
import restoreCursor from 'restore-cursor'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { commandConfigPrompt, commandInitPrompt, commandInstallPrompt } from './prompts'
/* eslint-disable ts/no-unused-expressions */

yargs(hideBin(process.argv))
  .scriptName('shlroland-lint')
  .command('install', 'install lint tools', yargs => yargs, () => commandInstallPrompt())
  .command('config', 'config lint tool', yargs => yargs, () => commandConfigPrompt())
  .command(
    ['$0', '$0 init'],
    'cli tool to setup lint tool',
    yargs => yargs,
    async () => {
      await commandInitPrompt()
    },
  )
  .alias('v', 'version')
  .version(version)
  .help('h', 'help info')
  .showHelpOnFail(false)
  .argv

process.stdin.on('keypress', (str: string, key: any) => {
  if ((key.ctrl && key.name === 'c'))
    process.exit()
})

restoreCursor()
