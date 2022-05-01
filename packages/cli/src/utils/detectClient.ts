import inquirer from 'inquirer'
import type { ClientType } from '../types'
import { Client } from '../types'

export const detectClient = async (): Promise<ClientType> => {
  const client = await inquirer.prompt<{ client: ClientType }>([
    {
      type: 'list',
      name: 'client',
      message: 'Which client do you want to use?',
      choices: [Client.pnpm, Client.yarn, Client.npm],
      default: Client.pnpm,
    },
  ])

  return client.client
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
