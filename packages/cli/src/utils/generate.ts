import type { PackageJson } from 'type-fest'
import semver from 'semver'
import { omit } from 'lodash'
import type { ListrTask } from 'listr'
import type { DepWithVersion, Task } from './types'
import { modifyPkg, removeFile } from './file'
import { installDep } from './exec'
import { BooleanT } from './F'

export const createDepsNameWithVersion = (
  pkg: PackageJson,
): DepWithVersion[] => {
  const pkgName = pkg.name
  const pkgVersion = pkg.version
  const peerDeps = pkg.peerDependencies ?? {}

  const peerDepsNames = Object.entries(peerDeps).map(([dep, rawVersion]) => {
    const version = semver.coerce(rawVersion).version
    return `${dep}@${version}` as DepWithVersion
  })

  return [`${pkgName}@${pkgVersion}`, ...peerDepsNames]
}

const COMMON_EXT = ['json', 'json5', 'yml', 'yaml', 'js', 'cjs', 'toml']

export const jointConfigurationExt = (
  name: string | string[],
  exts: string[] = COMMON_EXT,
) => {
  const names = Array.isArray(name) ? name : [name]
  return exts.map((ext) => names.map((name) => `${name}.${ext}`)).flat(2)
}

export const deletePropAboutPkg = async (prop: string | keyof PackageJson) => {
  await modifyPkg((pkg) => {
    pkg = omit(pkg, prop)
    return pkg
  })
}

export const createListrTask = (name: string, task: Task): ListrTask[] => {
  const installTask: ListrTask | false = task.installDepsList && {
    title: `InstallDepsList about ${name}`,
    task: () => {
      return installDep(task.installDepsList.join(' '))
    },
  }

  const removeFilesTask: ListrTask | false = task.removeFileList && {
    title: `RemoveFileList  about ${name}`,
    task: () => Promise.all(task.removeFileList.map(removeFile)),
  }

  const addFilesTask: ListrTask | false = task.addFileList && {
    title: `RemoveFileList  about ${name}`,
    task: () => Promise.all(task.removeFileList.map(removeFile)),
  }

  const extraTasksTask: ListrTask | false = task.extraTasks && {
    title: `Execute tasks about ${name}`,
    task: () => Promise.all(task.extraTasks.map((item) => item())),
  }

  return [installTask, removeFilesTask, addFilesTask, extraTasksTask].filter(
    BooleanT(),
  )
}
