import { AbstractAnswer } from './abstract/answer'
import { Config } from './abstract/config'
import { CosmiConfigOption } from './abstract/config-option'
import { Installer } from './abstract/install'

export class CommitlintAnswer extends AbstractAnswer {
  static toolName = 'commitlint'

  answerName = 'commitlint'

  installer = new Installer(['czg', '@commitlint/cli', '@shlroland/cz-config'])

  config = new Config([
    new CosmiConfigOption({
      configFileName: 'commitlint.config.js',
      esmImportConfigContent: ``,
      esmExportConfigContent: `{ extends: ['@shlroland/cz-config/commitlint'] }`,
      cjsImportConfigContent: ``,
      cjsExportConfigContent: `{ extends: ['@shlroland/cz-config/commitlint'] }`,
      checkConfigNames: ['commitlint'],
    }),
  ])
}
