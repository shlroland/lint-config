'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.isGitSync = exports.detectClientInstall = exports.detectClient = void 0
const path_1 = __importDefault(require('path'))
const inquirer_1 = __importDefault(require('inquirer'))
const fs_extra_1 = __importDefault(require('fs-extra'))
const types_1 = require('../types')
const detectClient = async () => {
  const client = await inquirer_1.default.prompt([
    {
      type: 'list',
      name: 'client',
      message: 'Which client do you want to use?',
      choices: [types_1.Client.pnpm, types_1.Client.yarn, types_1.Client.npm],
      default: types_1.Client.pnpm,
    },
  ])
  return client.client
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
const isGitSync = (dir) => {
  return fs_extra_1.default.existsSync(path_1.default.join(dir, '.git'))
}
exports.isGitSync = isGitSync
