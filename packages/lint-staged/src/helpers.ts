import path from 'path'

export const ensureArray = <T>(obj?: T | T[]): T[] => {
  if (obj == null) return []
  return Array.isArray(obj) ? obj : [obj]
}

export const fileNamesToCliArg = (names: string[], base = process.cwd()) => {
  return names.map((f) => path.relative(base, f)).join(' ')
}
