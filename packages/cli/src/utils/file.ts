import path from 'path'
import fs from 'fs-extra'
import type { PackageJson } from 'type-fest'

export const removeFile = async (file: string) => {
  const target = path.join(process.cwd(), file)
  return fs.remove(target)
}

export const createFile = async (path: string, content: string) => {
  return fs.outputFile(path, content)
}

export const createRootPath = (name: string, specified?: string) => {
  return path.join(specified ?? process.cwd(), name)
}

export const modifyPkg = async (cb: ModifyPkgCallback) => {
  const pkgPath = path.join(process.cwd(), 'package.json')
  const pkgStr = await fs.readFile(pkgPath, 'utf-8')
  const pkg: PackageJson = JSON.parse(pkgStr)
  const newPkg = cb(pkg)
  fs.writeFile(pkgPath, JSON.stringify(newPkg))
}

export type ModifyPkgCallback = (pkg: PackageJson) => PackageJson
