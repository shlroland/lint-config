'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.husky = void 0
const package_json_1 = __importDefault(
  require('@shlroland/husky-config/package.json'),
)
const husky_config_1 = __importDefault(require('@shlroland/husky-config'))
const execa_1 = __importDefault(require('execa'))
const generate_1 = require('../utils/generate')
const exec_1 = require('../utils/exec')
const file_1 = require('../utils/file')
const husky = () => {
  return {
    name: 'husky',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    extraTasks: [
      async () => {
        const paths = Object.keys(husky_config_1.default.hooks)
        return Promise.all(
          paths.map((path) => {
            return (0, file_1.removeFile)(`.husky/${path}`)
          }),
        )
      },
      async () => {
        await (0, exec_1.exec)('pnpm husky install')
        Promise.all(
          Object.entries(husky_config_1.default.hooks).map(([name, hook]) => {
            const cli = [`husky`, `add`, `.husky/${name}`, `"${`npx ${hook}`}"`]
            return (0, execa_1.default)('npx', cli)
          }),
        )
      },
    ],
  }
}
exports.husky = husky
