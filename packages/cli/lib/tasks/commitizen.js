'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.commitizen = void 0
const package_json_1 = __importDefault(
  require('@shlroland/commitizen-config/package.json'),
)
const generate_1 = require('../utils/generate')
const commitizen = () => {
  return {
    name: 'commitizen',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    toRemoveFiles: (0, generate_1.jointConfigurationExt)('.czrc'),
    toAddFiles: [
      {
        name: '.czrc',
        content: `{
            "path": "node_modules/cz-git",
            "useEmoji": true
          }`,
      },
    ],
    extraTasks: [
      async () => {
        await (0, generate_1.deletePropAboutPkg)('config.commitizen')
      },
    ],
  }
}
exports.commitizen = commitizen
