import { AbstractAnswer } from './abstract/answer'
import { Config } from './abstract/config'
import { CosmiConfigOption } from './abstract/config-option'
import { Installer } from './abstract/install'

export class LintStagedAnswer extends AbstractAnswer {
  static toolName = 'lint-staged'

  answerName = 'lint-staged'

  installer = new Installer(['lint-staged', '@shlroland/lint-staged'])

  config = new Config([
    new CosmiConfigOption({
      configFileName: 'lint-staged.config.js',
      esmImportConfigContent: 'import lintStaged from "@shlroland/lint-staged"',
      esmExportConfigContent: 'lintStaged',
      cjsImportConfigContent: 'const lintStaged = require("@shlroland/lint-staged")',
      cjsExportConfigContent: 'lintStaged',
      checkConfigNames: ['lint-staged', 'lintstaged'],
    }),
  ])
}
