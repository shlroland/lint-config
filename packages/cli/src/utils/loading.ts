import type { Options } from 'ora'
import ora from 'ora'

export const loading = (opts: Options) => ora(opts)
