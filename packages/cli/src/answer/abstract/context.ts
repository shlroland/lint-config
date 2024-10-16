import process from 'node:process'
import { getModuleType } from '../../utils'

export interface Context {
  moduleType: 'module' | 'commonjs'
  cwd: string
}

export class AnswerContext {
  moduleType: 'module' | 'commonjs'

  cwd: string

  constructor(context: Context) {
    this.cwd = context.cwd

    this.moduleType = context.moduleType
  }

  static instance: AnswerContext
}

export async function initAnswerContext() {
  const cwd = process.cwd()
  const moduleType = await getModuleType(cwd)
  const context = {
    moduleType,
    cwd,
  }

  AnswerContext.instance = new AnswerContext(context)
}
