export enum Client {
  pnpm = 'pnpm',
  yarn = 'yarn',
  npm = 'npm',
}

export type ClientType = keyof typeof Client

export interface ListerCtx {
  client: ClientType
}
