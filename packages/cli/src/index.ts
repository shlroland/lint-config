import * as path from 'path'
import fs from 'fs-extra'
import { createTasks } from './tasks'
import { detectClient } from './utils/detect'

export const init = async () => {
  process.chdir(process.cwd())

  const pkgPath = path.join(process.cwd(), 'package.json')

  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json find in ${process.cwd()}`)
  }

  const client = await detectClient()

  const tasks = await createTasks()

  tasks.run({ client }).catch((err) => {
    console.error(err)
  })
}

export { cli } from './cli/task'
