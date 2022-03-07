import type { PackageJson } from 'type-fest'
import semver from 'semver'
import type { DepWithVersion } from './types'

export const createDepsNameWithVersion = (
  pkg: PackageJson,
): DepWithVersion[] => {
  const pkgName = pkg.name
  const pkgVersion = pkg.version
  const peerDeps = pkg.peerDependencies ?? {}

  const peerDepsNames = Object.entries(peerDeps).map(([dep, rawVersion]) => {
    const version = semver.coerce(rawVersion).version
    return `${dep}@${version}` as DepWithVersion
  })

  return [`${pkgName}@${pkgVersion}`, ...peerDepsNames]
}

const COMMON_EXT = ['json', 'json5', 'yml', 'yaml', 'js', 'cjs', 'toml']

export const jointConfigurationExt = (
  name: string | string[],
  exts: string[] = COMMON_EXT,
) => {
  const names = Array.isArray(name) ? name : [name]
  return exts.map((ext) => names.map((name) => `${name}.${ext}`)).flat(2)
}
