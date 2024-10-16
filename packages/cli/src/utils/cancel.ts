import process from 'node:process'
import * as p from '@clack/prompts'

export function onCancel(): never {
  p.cancel('Operation canceled')
  process.exit(0)
}
