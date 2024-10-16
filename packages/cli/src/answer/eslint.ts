import { AbstractAnswer } from './abstract/answer'
import { Config } from './abstract/config'
import { CosmiConfigOption } from './abstract/config-option'
import { Installer } from './abstract/install'

export class EslintAnswer extends AbstractAnswer {
  static toolName = 'eslint'

  answerName = 'eslint'

  installer = new Installer(['eslint', '@shlroland/eslint-config', 'eslint-plugin-format'])

  config = new Config(
    [
      new CosmiConfigOption({
        configFileName: 'eslint.config.js',
        esmImportConfigContent: 'import { shlroland } from "@shlroland/eslint-config"',
        esmExportConfigContent: 'shlroland()',
        cjsImportConfigContent: 'const { shlroland } = require("@shlroland/eslint-config")',
        cjsExportConfigContent: 'shlroland()',
        checkConfigNames: ['eslint'],
      }),
    ],
  )
}
