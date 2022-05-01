export const BooleanT =
  <T>() =>
  (a: T | '' | 0 | 0n | false | null | undefined | void): a is T => {
    return Boolean(a)
  }

export const camelize = (s: string) =>
  s.replace(/-./g, (x) => x[1].toUpperCase())
