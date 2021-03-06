import type { ListerCtx } from '../types'

interface AddFileItem {
  name: string
  path?: string
  content: string
}

export interface TaskReturn {
  name: string
  predecessorTasks?: Fn[]
  toRemoveDeps?: string[]
  toInstallDeps: DepWithVersion[]
  toRemoveFiles?: string[]
  toAddFiles?: AddFileItem[]
  extraTasks?: Fn[]
}

export type TaskFn = (ctx: ListerCtx, cfgFn: TaskFn[]) => TaskReturn

export type DepWithVersion<
  Dep extends string = string,
  Version extends string = string,
> = `${Dep}@${Version}`

export type Fn = (...args: any[]) => void

export interface Task {
  predecessorTasks?: Fn[]
  installDepsList: DepWithVersion[]
  removeFileList: string[]
  addFileList: {
    path: string
    content: string
  }[]
  extraTasks?: Fn[]
}
