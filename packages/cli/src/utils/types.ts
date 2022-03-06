interface AddFileItem {
  name: string
  path?: string
  content: string
}

export interface TaskReturn {
  name: string
  toRemoveDeps?: string[]
  toInstallDeps: DepWithVersion[]
  toRemoveFiles?: string[]
  toAddFiles?: AddFileItem[]
}

export type DepWithVersion<
  Dep extends string = string,
  Version extends string = string,
> = `${Dep}@${Version}`
