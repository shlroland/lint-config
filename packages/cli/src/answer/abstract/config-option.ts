import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { cjsConfigFactory, ensureConfig, esmConfigFactory } from '../../utils'
import { AnswerContext } from './context'

export abstract class ConfigOption {
  protected context: AnswerContext = AnswerContext.instance

  abstract configFileName: string

  abstract configFilePath: string

  abstract configFileContent: string

  abstract checkConfigFileExisted(): Promise<boolean>

  async overrideFile(): Promise<void> {
    return Promise.resolve()
  }
}

export class CommonConfigOption extends ConfigOption {
  configFileName: string

  configFilePath: string

  configFileContent: string

  constructor(options: { configFileName: string, content: string }) {
    super()
    this.configFileName = options.configFileName
    this.configFilePath = path.join(this.context.cwd, this.configFileName)
    this.configFileContent = options.content
  }

  async checkConfigFileExisted(): Promise<boolean> {
    const filePath = path.resolve(process.cwd(), this.configFilePath)
    const exists = await fs.promises.access(filePath).then(() => true).catch(() => false)
    return exists
  }
}

export class CosmiConfigOption extends ConfigOption {
  configFileName: string

  configFilePath: string

  configFileContent: string

  private esmImportConfigContent: string

  private esmExportConfigContent: string

  private cjsImportConfigContent: string

  private cjsExportConfigContent: string

  private checkConfigNames: string[]

  constructor(
    options: {
      configFileName: string
      esmImportConfigContent: string
      esmExportConfigContent: string
      cjsImportConfigContent: string
      cjsExportConfigContent: string
      checkConfigNames: string[]
    },
  ) {
    super()
    this.configFileName = options.configFileName
    this.esmImportConfigContent = options.esmImportConfigContent
    this.esmExportConfigContent = options.esmExportConfigContent
    this.cjsImportConfigContent = options.cjsImportConfigContent
    this.cjsExportConfigContent = options.cjsExportConfigContent
    this.checkConfigNames = options.checkConfigNames
    const { content, path } = this.configFileContentFactory()
    this.configFileContent = content
    this.configFilePath = path
  }

  private configFileContentFactory(): { content: string, path: string } {
    const content = this.context.moduleType === 'module'
      ? esmConfigFactory(this.esmExportConfigContent, this.esmImportConfigContent)
      : cjsConfigFactory(this.cjsExportConfigContent, this.cjsImportConfigContent)

    return {
      content,
      path: path.join(this.context.cwd, this.configFileName),
    }
  }

  async checkConfigFileExisted(): Promise<boolean> {
    const checkConfigNames = this.checkConfigNames
    for (const configName of checkConfigNames) {
      const config = await ensureConfig(configName)
      if (config) {
        return true
      }
    }
    return false
  }
}
