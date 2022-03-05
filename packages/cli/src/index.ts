import * as path from 'path'
import fs from 'fs-extra'
import { loading } from './utils/loading'
import { exec } from './utils/exec'

export const init = async () => {
  process.chdir(process.cwd())

  const pkgPath = path.join(process.cwd(), 'package.json')

  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json find in ${process.cwd()}`)
  }

  const spinner = loading({ text: 'Install lint-config...' }).start()
  await exec('pnpm i ramrif')
  setTimeout(() => {
    spinner.stop()
  }, 3000)
}
init()
