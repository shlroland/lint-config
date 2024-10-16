import fsP from 'node:fs/promises'

export function deleteFile(filePath: string) {
  return fsP.unlink(filePath)
}

export function writeFile(filePath: string, content: string) {
  return fsP.writeFile(filePath, content)
}
