import type { CosmiconfigResult } from 'cosmiconfig'
import type { PackageJson } from 'type-fest'
import fs from 'node:fs'
import fsP from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { cosmiconfig } from 'cosmiconfig'
import c from 'picocolors'

export async function getModuleType(cwd: string): Promise<'commonjs' | 'module'> {
  const packageJsonPath = path.join(cwd, 'package.json')
  const packageJson = JSON.parse(await fsP.readFile(packageJsonPath, 'utf-8')) as PackageJson
  return packageJson.type ?? 'commonjs'
}

export function isGitRepository(directory: string): boolean {
  const gitDir = path.join(directory, '.git')
  return fs.existsSync(gitDir) && fs.lstatSync(gitDir).isDirectory()
}

export function isHuskyInstalled(directory: string): boolean {
  const huskyDir = path.join(directory, '.husky')
  return fs.existsSync(huskyDir) && fs.lstatSync(huskyDir).isDirectory()
}

const commonjsError = [
  'Unexpected token \'export\'',
  'SyntaxError: Cannot use import statement outside a module',
]
const esmError = 'module is not defined in ES module scope'

function isPackageModuleError(error: Error): boolean {
  return commonjsError.some(msg => error.message.includes(msg)) || error.message.includes(esmError)
}

export async function ensureConfig(moduleName: string): Promise<CosmiconfigResult | undefined> {
  try {
    const explorer = cosmiconfig(moduleName)
    const result = await explorer.search()
    return result
  }
  catch (error) {
    if (error instanceof Error) {
      const isCjsOrEsmError = isPackageModuleError(error)
      if (isCjsOrEsmError) {
        console.log(`${c.redBright(`So bad`)} 😞! 

        You may have mismatched the value of the ${c.yellowBright(`"type"`)} field in ${c.greenBright('package.json')} and the export format of the ${c.blueBright(moduleName)} configuration file. 

        Please check your ${c.greenBright('package.json')} and ${c.blueBright(moduleName)} configuration file.
        `)
        process.exit(10)
      }
      throw error
    }
  }
}
