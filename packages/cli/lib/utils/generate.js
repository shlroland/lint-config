'use strict'
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
const deletePropAboutPkg = async (prop) => {
  await (0, file_1.modifyPkg)((pkg) => {
    pkg = (0, lodash_1.omit)(pkg, prop)
    return pkg
  })
}
exports.deletePropAboutPkg = deletePropAboutPkg
const createListrTask = (name, task, ctx) => {
  const installTask = task.installDepsList && {
    title: `InstallDepsList about ${name}`,
    task: () => {
      return (0, exec_1.installDep)(ctx.client, task.installDepsList.join(' '))
    },
  }
  const removeFilesTask = task.removeFileList && {
    title: `RemoveFileList  about ${name}`,
    task: () => Promise.all(task.removeFileList.map(file_1.removeFile)),
  }
  const addFilesTask = task.addFileList && {
    title: `addFilesList  about ${name}`,
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
  const predecessorTasks = task.predecessorTasks && {
    title: `Execute predecessor tasks about ${name}`,
    task: () => Promise.all(task.predecessorTasks.map((item) => item())),
  }
  return [
    predecessorTasks,
    installTask,
    removeFilesTask,
    addFilesTask,
    extraTasksTask,
  ].filter((0, F_1.BooleanT)())
}
exports.createListrTask = createListrTask
