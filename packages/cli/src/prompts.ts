import type { Answers } from './types'
import * as p from '@clack/prompts'
import c from 'picocolors'
import { defaultConfigAnswers, LintTools } from './constants'
import { checkConfig, getConfigFilesWillWriteList, writeConfig } from './tasks/config'
import { getPendingPkgs, install } from './tasks/installer'
import { sleep } from './utils'

function onCancel() {
  p.cancel('Operation cancelled.')
  process.exit(0)
}

export async function commandInstallPrompt(interactive = false): Promise<void> {
  console.clear()

  await sleep(1000)

  p.intro(c.bgGreen(c.greenBright(`🧺 This command will install lint tools only but not config them.`)))

  await sleep(1000)

  p.log.step(c.cyan(('⏳ Installing packages...')))

  await installPrompt(interactive)

  p.outro(c.green(('🎉 Install lint tools successfully.')))
}

async function installPrompt(interactive = false) {
  const answers = interactive ? await installOptionsPrompt() : defaultConfigAnswers

  const pendingPkgs = await getPendingPkgs(answers.lintTools)

  p.note(`${c.yellowBright('🛠️  will install packages')}:\n${pendingPkgs.map(pkg => c.cyanBright(pkg)).join('\n')}\n`)

  await install(pendingPkgs)

  return answers
}

export async function installOptionsPrompt(): Promise<Answers> {
  const lintTools = await p.multiselect({
    message: 'Please select lint tools to install:',
    options: [
      { value: LintTools.ESLINT, label: 'eslint' },
      { value: LintTools.COMMITLINT_CZG, label: 'commitlint and czg' },
      { value: LintTools.LINT_STAGED, label: 'lint-staged' },
      { value: LintTools.HUSKY, label: 'husky' },
    ],
    initialValues: defaultConfigAnswers.lintTools,

  }) as LintTools[]

  if (p.isCancel(lintTools)) {
    onCancel()
  }

  return { lintTools }
}

export async function commandConfigPrompt(interactive = false, forceConfig = false): Promise<void> {
  console.clear()

  await sleep(1000)

  p.intro(c.bgBlack(c.bgBlackBright(`🧰 This command will config lint tools only but not install them.`)))

  await sleep(1000)

  await configPrompt({ interactive, forceConfig })

  p.outro(c.green('🎉 Config lint tools successfully.'))
}

async function configPrompt({
  interactive = false,
  forceConfig = false,
  defaultAnswers = defaultConfigAnswers,
}:
{
  interactive?: boolean
  forceConfig?: boolean
  defaultAnswers?: Answers
}) {
  const answers = interactive ? await configOptionsPrompt() : defaultAnswers

  const configResult = await checkConfig(answers, forceConfig)

  p.note(`${c.yellowBright('🔧 will config default lint tool')}:\n${(getConfigFilesWillWriteList(configResult)
    .map(file => c.cyanBright(file))
    .join('\n'))}\n`)

  const spinner = p.spinner()

  spinner.start('⏳ Configuring lint tools...')

  await writeConfig(configResult)

  await sleep(1000)

  spinner.stop('✅ Done!')
}

export async function configOptionsPrompt(): Promise<Answers> {
  const lintTools = await p.multiselect({
    message: 'Please select the lint tools to config:',
    options: [
      { value: LintTools.ESLINT, label: 'eslint' },
      { value: LintTools.COMMITLINT_CZG, label: 'commitlint and czg' },
      { value: LintTools.LINT_STAGED, label: 'lint-staged' },
      { value: LintTools.HUSKY, label: 'husky' },
    ],
    initialValues: defaultConfigAnswers.lintTools,
  }) as LintTools[]

  if (p.isCancel(lintTools)) {
    console.log(lintTools)
    onCancel()
  }

  return { lintTools }
}

export async function commandInitPrompt(interactive = false, forceConfig = false) {
  await sleep(500)

  p.intro(c.bgMagenta(c.magentaBright(`🚀 This command will install lint tools and config them.`)))

  await sleep(500)

  p.log.step(c.cyan('📦  Install lint tools step'))

  const answers = await installPrompt(interactive)

  p.log.step(c.green('😋 Install lint tools successfully.'))

  await sleep(500)

  p.log.step(c.cyan('🛠️  Config lint tools step'))

  await configPrompt({ interactive, forceConfig, defaultAnswers: answers })

  p.log.step(c.green('🥳 Config lint tools successfully.'))

  await sleep(500)

  p.outro(c.magentaBright('🎉 Setup lint tools successfully.'))
}

export async function shouldOverridePrompt(tool: string, forceConfig = false) {
  if (forceConfig) {
    return true
  }

  const shouldOverride = await p.confirm({
    message: `${highlightPkg(tool)} configuration already exists, do you want to override it?`,
    initialValue: true,
  })

  return !!shouldOverride
}

export async function notOverrideWarningPrompt(tool: string) {
  p.log.warn(
    `The ${highlightPkg(tool)} config will not be written. You should check the config file manually.`,
  )
}

export async function shouldInitGitPrompt() {
  return p.confirm({
    message: `Current directory is not a ${highlightPkg('git')} repository, do you want to initialize it?`,
    initialValue: true,
  })
}

export async function huskyNotConfiguredPrompt() {
  p.log.warn(`${highlightPkg('husky')} will not be configured.`)
}

export function highlightPkg(pkg: string) {
  return c.red(pkg)
}
