'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.lintStaged = void 0
const package_json_1 = __importDefault(
  require('@shlroland/lint-staged/package.json'),
)
const generate_1 = require('../utils/generate')
const file_1 = require('../utils/file')
const lintStaged = () => {
  return {
    name: 'lintStaged',
    toInstallDeps: [
      ...(0, generate_1.createDepsNameWithVersion)(package_json_1.default),
    ],
    toRemoveFiles: (0, generate_1.jointConfigurationExt)([
      '.lintstagedrc',
      'lint-staged.config',
    ]),
    toAddFiles: [
      {
        name: 'lint-staged.config.js',
        content: `module.exports = require('@shlroland/lint-staged')`,
      },
    ],
    extraTasks: [
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          ;(0, file_1.modifyPkg)((pkg) => {
            pkg.scripts['lint-staged'] = 'lint-staged'
            return pkg
          })
        }),
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          yield (0, generate_1.deletePropAboutPkg)('lint-staged')
        }),
    ],
  }
}
exports.lintStaged = lintStaged
