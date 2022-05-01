export declare const BooleanT: <T>() => (
  a: false | void | '' | 0 | 0n | T,
) => a is T
export declare const camelize: (s: string) => string
