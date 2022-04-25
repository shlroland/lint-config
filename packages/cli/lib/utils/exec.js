'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.installDep = exports.exec = void 0
const execa_1 = __importDefault(require('execa'))
const detectClient_1 = require('./detectClient')
async function exec(cmd, options = {}) {
  const [shell, ...args] = cmd.split(' ')
  const child = await (0, execa_1.default)(shell, args, { ...options })
  return child
}
exports.exec = exec
const installDep = async (client, dep) => {
  const installCmd = (0, detectClient_1.detectClientInstall)(client)
  return exec(`${installCmd} -D ${dep}`)
}
exports.installDep = installDep
