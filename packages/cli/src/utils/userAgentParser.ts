import semver from 'semver'

const partition = <T>(array: T[], predicate: (item: T) => boolean): T[][] =>
  array.reduce(
    ([left, right], item) =>
      predicate(item) ? [[...left, item], right] : [left, [...right, item]],
    [[], []],
  )

export const parseUserAgent = (userAgent: string) => {
  const parts = userAgent.split(' ')

  const [engines, os] = partition(parts, (part) => part.includes('/'))

  const [platform, arch] = os

  const parsedEngines = engines
    .map((engine) => engine.split('/'))
    .reduce(
      (state, [name, version]) => ({
        ...state,
        [name]: semver.coerce(version),
      }),
      {},
    )

  return {
    ...parsedEngines,
    platform,
    arch,
    raw: userAgent,
  }
}
