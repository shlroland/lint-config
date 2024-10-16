import { parseNi, run } from '@antfu/ni'
import * as p from '@clack/prompts'
import { x } from 'tinyexec'

export async function install(pendingPkgs: string[]) {
  await run(parseNi, ['-D', ...pendingPkgs], { programmatic: true })
}

export async function initGit() {
  const spinner = p.spinner()
  spinner.start('Initializing git repository')
  await x('git', ['init'])
  spinner.stop('Git repository initialized')
}
