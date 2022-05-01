import type { ClientType } from '../types'
export declare const detectClient: () => Promise<ClientType>
export declare const detectClientInstall: (client: ClientType) => string
