'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.prettier = void 0
const package_json_1 = __importDefault(
  require('@shlroland/prettier-config/package.json'),
)
const generate_1 = require('../utils/generate')
const prettier = () => {
  return {
    name: 'prettier',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    toRemoveFiles: (0, generate_1.jointConfigurationExt)([
      '.prettierrc',
      'prettier.config',
    ]),
    toAddFiles: [
      {
        name: 'prettier.config.js',
        content: 'module.exports = require("@shlroland/prettier-config")',
      },
    ],
    extraTasks: [
      async () => {
        await (0, generate_1.deletePropAboutPkg)('prettier')
      },
    ],
  }
}
exports.prettier = prettier
