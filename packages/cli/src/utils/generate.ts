import type { PackageJson } from 'type-fest'
import semver from 'semver'
import { omit } from 'lodash'
import type { ListrTask } from 'listr'
import type { ListerCtx } from '../types'
import type { DepWithVersion, Task } from './types'
import { createFile, modifyPkg, removeFile } from './file'
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

export const createListrTask = (
  name: string,
  task: Task,
  ctx: ListerCtx,
): ListrTask<ListerCtx>[] => {
  const installTask: ListrTask<ListerCtx> | false = task.installDepsList && {
    title: `InstallDepsList about ${name}`,
    task: () => {
      return installDep(ctx.client, task.installDepsList.join(' '))
    },
  }

  const removeFilesTask: ListrTask<ListerCtx> | false = task.removeFileList && {
    title: `RemoveFileList  about ${name}`,
    task: () => Promise.all(task.removeFileList.map(removeFile)),
  }

  const addFilesTask: ListrTask<ListerCtx> | false = task.addFileList && {
    title: `addFilesList  about ${name}`,
    task: () =>
      Promise.all(
        task.addFileList.map((item) => createFile(item.path, item.content)),
      ),
  }

  const extraTasksTask: ListrTask<ListerCtx> | false = task.extraTasks && {
    title: `Execute tasks about ${name}`,
    task: () => Promise.all(task.extraTasks.map((item) => item())),
  }

  const predecessorTasks: ListrTask<ListerCtx> | false =
    task.predecessorTasks && {
      title: `Execute predecessor tasks about ${name}`,
      task: () => Promise.all(task.predecessorTasks.map((item) => item())),
    }

  return [
    predecessorTasks,
    installTask,
    removeFilesTask,
    addFilesTask,
    extraTasksTask,
  ].filter(BooleanT())
}
