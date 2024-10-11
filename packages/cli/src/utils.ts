import type { PackageJson } from 'type-fest'
import fs from 'node:fs'
import fsP from 'node:fs/promises'
import path from 'node:path'

export function deleteFile(filePath: string) {
  return fsP.unlink(filePath)
}

export async function getModuleType(cwd: string) {
  const packageJsonPath = path.join(cwd, 'package.json')
  const packageJson = JSON.parse(await fsP.readFile(packageJsonPath, 'utf-8')) as PackageJson
  return packageJson.type
}

export function isGitRepository(directory: string): boolean {
  const gitDir = path.join(directory, '.git')
  return fs.existsSync(gitDir) && fs.lstatSync(gitDir).isDirectory()
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
