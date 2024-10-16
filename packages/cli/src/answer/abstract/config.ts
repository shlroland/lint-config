import type { ConfigOption } from './config-option'

export class Config {
  #pendingConfigs: Map<string, ConfigOption> = new Map()

  constructor(defaultConfigs: ConfigOption[]) {
    for (const config of defaultConfigs) {
      this.#pendingConfigs.set(config.configFileName, config)
    }
  }

  addPendingConfig(config: ConfigOption) {
    this.#pendingConfigs.set(config.configFileName, config)
  }

  removePendingConfig(config: ConfigOption) {
    this.#pendingConfigs.delete(config.configFileName)
  }

  clearPendingConfigs() {
    this.#pendingConfigs.clear()
  }

  get pendingConfigs() {
    return this.#pendingConfigs.values()
  }
}
