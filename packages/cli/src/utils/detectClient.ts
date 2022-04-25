import type { ClientType } from '../types'
import { Client } from '../types'
import { parseUserAgent } from './userAgentParser'

export const detectClient = (): ClientType => {
  const current = parseUserAgent(process.env.npm_config_user_agent || '')
  const keys = Object.keys(current)
  const client = keys.includes(Client.pnpm)
    ? 'pnpm'
    : keys.includes('yarn')
    ? 'yarn'
    : 'npm'

  return client
}

export const detectClientInstall = (client: ClientType): string => {
  switch (client) {
    case Client.pnpm:
      return 'pnpm install'
    case Client.yarn:
      return 'yarn add'
    default:
      return 'npm install'
  }
}
