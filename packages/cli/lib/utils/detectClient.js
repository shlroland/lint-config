'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.detectClientInstall = exports.detectClient = void 0
const types_1 = require('../types')
const userAgentParser_1 = require('./userAgentParser')
const detectClient = () => {
  const current = (0, userAgentParser_1.parseUserAgent)(
    process.env.npm_config_user_agent || '',
  )
  const keys = Object.keys(current)
  const client = keys.includes(types_1.Client.pnpm)
    ? 'pnpm'
    : keys.includes('yarn')
    ? 'yarn'
    : 'npm'
  return client
}
exports.detectClient = detectClient
const detectClientInstall = (client) => {
  switch (client) {
    case types_1.Client.pnpm:
      return 'pnpm install'
    case types_1.Client.yarn:
      return 'yarn add'
    default:
      return 'npm install'
  }
}
exports.detectClientInstall = detectClientInstall
