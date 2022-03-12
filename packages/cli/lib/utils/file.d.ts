import type { PackageJson } from 'type-fest'
export declare const removeFile: (file: string) => Promise<void>
export declare const createFile: (
  path: string,
  content: string,
) => Promise<void>
export declare const createRootPath: (
  name: string,
  specified?: string,
) => string
export declare const modifyPkg: (cb: ModifyPkgCallback) => Promise<void>
export declare type ModifyPkgCallback = (pkg: PackageJson) => PackageJson
