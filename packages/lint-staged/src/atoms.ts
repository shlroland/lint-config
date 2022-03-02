import { fileNamesToCliArg } from './helpers'
import { wrap } from './operators'

export const prettier = wrap((filenames: string[]) => {
  if (!filenames.length) return []

  const cliFileNames = fileNamesToCliArg(filenames)

  return [`pnpm prettier --write ${cliFileNames}`]
})

export const eslint = wrap((filenames) => {
  if (!filenames.length) return []

  const cliFileNames = fileNamesToCliArg(
    filenames.filter((f) => !f.includes('eslint')),
  )

  return [`pnpm eslint ${cliFileNames}`]
})
