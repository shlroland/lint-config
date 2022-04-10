import * as path from 'path'
import fs from 'fs-extra'
import { createTasks } from './tasks'

export const init = async () => {
  process.chdir(process.cwd())

  const pkgPath = path.join(process.cwd(), 'package.json')

  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json find in ${process.cwd()}`)
  }

  const tasks = await createTasks()

  tasks.run().catch((err) => {
    console.error(err)
  })
}

export { cli } from './cli/task'
