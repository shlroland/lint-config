export interface InstallReturn {
  name: string
  toRemoveDeps?: string[]
  toInstallDeps: string[]
  toRemoveFiles?: string[]
  toAddFiles?: string[] | string[][]
}
