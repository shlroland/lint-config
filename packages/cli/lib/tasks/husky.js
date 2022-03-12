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
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          return (0, exec_1.exec)('pnpm husky install')
        }),
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          const paths = Object.keys(husky_config_1.default.hooks)
          return Promise.all(
            paths.map((path) => {
              return (0, file_1.removeFile)(`.husky/${path}`)
            }),
          )
        }),
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          return Promise.all(
            Object.entries(husky_config_1.default.hooks).map(([name, hook]) => {
              const cli = [
                `husky`,
                `add`,
                `.husky/${name}`,
                `"${`npx ${hook}`}"`,
              ]
              return (0, execa_1.default)('npx', cli)
            }),
          )
        }),
    ],
  }
}
exports.husky = husky
