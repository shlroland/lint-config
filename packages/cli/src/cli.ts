/* eslint-disable ts/no-unused-expressions */
import restoreCursor from 'restore-cursor'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { commandConfigPrompt, commandInitPrompt, commandInstallPrompt } from './prompts'

yargs(hideBin(process.argv))
  .scriptName('shlroland-lint')
  .command('install', 'install lint tools', (yargs) => {
    return yargs.option('interactive', {
      alias: 'I',
      type: 'boolean',
      description: 'Interactive selection of packages to install',
    })
  }, async (argv) => {
    await commandInstallPrompt(argv.interactive)
  })
  .command('config', 'config lint tool', (yargs) => {
    return yargs.option('interactive', {
      alias: 'I',
      type: 'boolean',
      description: 'Interactive selection of config to write',
    }).option('force-config', {
      alias: 'f',
      type: 'boolean',
      description: 'Force to write config if config is already existed',
    })
  }, async (argv) => {
    await commandConfigPrompt(argv.interactive, argv.forceConfig)
  })

  .command(
    ['$0', '$0 init'],
    'cli tool to setup lint tool',
    (yargs) => {
      return yargs.option('interactive', {
        alias: 'I',
        type: 'boolean',
        description: 'Interactive selection of packages to install',
      }).option('force-config', {
        alias: 'f',
        type: 'boolean',
        description: 'Force to write config if config is already existed',
      })
    },
    async (argv) => {
      await commandInitPrompt(argv.interactive, argv.forceConfig)
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
