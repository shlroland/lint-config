import semver from 'semver'
export const createDepsNameWithVersion = (pkg) => {
  var _a
  const pkgName = pkg.name
  const pkgVersion = pkg.version
  const peerDeps =
    (_a = pkg.peerDependencies) !== null && _a !== void 0 ? _a : {}
  const peerDepsNames = Object.entries(peerDeps).map(([dep, rawVersion]) => {
    const version = semver.coerce(rawVersion).version
    return `${dep}@${version}`
  })
  return [`${pkgName}@${pkgVersion}`, ...peerDepsNames]
}
const COMMON_EXT = ['json', 'json5', 'yml', 'yaml', 'js', 'cjs', 'toml']
export const jointConfigurationExt = (name, exts = COMMON_EXT) => {
  const names = Array.isArray(name) ? name : [name]
  return exts.map((ext) => names.map((name) => `${name}.${ext}`)).flat(2)
}
