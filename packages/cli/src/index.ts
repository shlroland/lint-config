import * as path from 'path'
import fs from 'fs-extra'
import { detectClient } from './utils/detect'
import { createTasks } from './createTasks'
import type { ListerCtx } from './types'

export const init = async () => {
  process.chdir(process.cwd())

  const pkgPath = path.join(process.cwd(), 'package.json')

  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json find in ${process.cwd()}`)
  }

  const client = await detectClient()

  const ctx: ListerCtx = { client }

  const tasks = await createTasks(ctx)

  tasks.run(ctx).catch((err) => {
    console.error(err)
  })
}

export { cli } from './cli/task'
