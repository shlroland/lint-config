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
exports.createListrTask =
  exports.deletePropAboutPkg =
  exports.jointConfigurationExt =
  exports.createDepsNameWithVersion =
    void 0
const semver_1 = __importDefault(require('semver'))
const lodash_1 = require('lodash')
const file_1 = require('./file')
const exec_1 = require('./exec')
const F_1 = require('./F')
const createDepsNameWithVersion = (pkg) => {
  var _a
  const pkgName = pkg.name
  const pkgVersion = pkg.version
  const peerDeps =
    (_a = pkg.peerDependencies) !== null && _a !== void 0 ? _a : {}
  const peerDepsNames = Object.entries(peerDeps).map(([dep, rawVersion]) => {
    const version = semver_1.default.coerce(rawVersion).version
    return `${dep}@${version}`
  })
  return [`${pkgName}@${pkgVersion}`, ...peerDepsNames]
}
exports.createDepsNameWithVersion = createDepsNameWithVersion
const COMMON_EXT = ['json', 'json5', 'yml', 'yaml', 'js', 'cjs', 'toml']
const jointConfigurationExt = (name, exts = COMMON_EXT) => {
  const names = Array.isArray(name) ? name : [name]
  return exts.map((ext) => names.map((name) => `${name}.${ext}`)).flat(2)
}
exports.jointConfigurationExt = jointConfigurationExt
const deletePropAboutPkg = (prop) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield (0, file_1.modifyPkg)((pkg) => {
      pkg = (0, lodash_1.omit)(pkg, prop)
      return pkg
    })
  })
exports.deletePropAboutPkg = deletePropAboutPkg
const createListrTask = (name, task) => {
  const installTask = task.installDepsList && {
    title: `InstallDepsList about ${name}`,
    task: () => {
      return (0, exec_1.installDep)(task.installDepsList.join(' '))
    },
  }
  const removeFilesTask = task.removeFileList && {
    title: `RemoveFileList  about ${name}`,
    task: () => Promise.all(task.removeFileList.map(file_1.removeFile)),
  }
  const addFilesTask = task.addFileList && {
    title: `RemoveFileList  about ${name}`,
    task: () =>
      Promise.all(
        task.addFileList.map((item) =>
          (0, file_1.createFile)(item.path, item.content),
        ),
      ),
  }
  const extraTasksTask = task.extraTasks && {
    title: `Execute tasks about ${name}`,
    task: () => Promise.all(task.extraTasks.map((item) => item())),
  }
  return [installTask, removeFilesTask, addFilesTask, extraTasksTask].filter(
    (0, F_1.BooleanT)(),
  )
}
exports.createListrTask = createListrTask
