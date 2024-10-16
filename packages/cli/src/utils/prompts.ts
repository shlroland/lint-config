import * as p from '@clack/prompts'
import c from 'picocolors'

export function willInstallList(pendingPkgs: string[]) {
  p.note(`${c.yellowBright('🛠️  will install packages')}:\n${pendingPkgs.map(pkg => c.cyanBright(pkg)).join('\n')}\n`)
}

export async function shouldOverridePrompt(tool: string) {
  const shouldOverride = await p.confirm({
    message: `${highlightPkg(tool)} configuration already exists, do you want to override it?`,
    initialValue: true,
  })

  return !!shouldOverride
}

export function highlightPkg(pkg: string) {
  return c.red(pkg)
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
