import type { PackageJson } from 'type-fest'
import type { ListrTask } from 'listr'
import type { DepWithVersion, Task } from './types'
export declare const createDepsNameWithVersion: (
  pkg: PackageJson,
) => DepWithVersion[]
export declare const jointConfigurationExt: (
  name: string | string[],
  exts?: string[],
) => string[]
export declare const deletePropAboutPkg: (
  prop: string | keyof PackageJson,
) => Promise<void>
export declare const createListrTask: (name: string, task: Task) => ListrTask[]
