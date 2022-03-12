import type { PackageJson } from 'type-fest'
import type { DepWithVersion } from './types'
export declare const createDepsNameWithVersion: (
  pkg: PackageJson,
) => DepWithVersion[]
export declare const jointConfigurationExt: (
  name: string | string[],
  exts?: string[],
) => string[]
