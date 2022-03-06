import path from 'path'
import fs from 'fs-extra'

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
