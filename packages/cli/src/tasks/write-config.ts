import type { CheckConfigResult } from '../types'
import fs from 'node:fs/promises'
import path from 'node:path'
import { CodeLintTools, configFilePaths, FormatTools, GitLintTools } from '../constants'

const configContents = {
  [CodeLintTools.ESLINT_DEFAULT]: `
  import { shlroland } from "@shlroland/eslint-config";

  export default shlroland();
  `,
  [CodeLintTools.ESLINT_NO_EXTERNAL]: `
  import { shlroland } from "@shlroland/eslint-config";

  export default shlroland({ formatters: false });
  `,
  [CodeLintTools.ESLINT_NO_FORMATTER]: `
  import { shlroland } from "@shlroland/eslint-config";

  export default shlroland({ formatters: false, stylistic: false });
  `,
  [CodeLintTools.ESLINT_PRETTIER]: `
  import { shlroland } from "@shlroland/eslint-config";

  export default shlroland({ formatters: false, stylistic: false });
  `,
  [FormatTools.PRETTIER]: `
  import shlroland  from "@shlroland/prettier-config";

  export default shlroland
  `,
  [GitLintTools.COMMITLINT]: `
  import { shlroland } from "@shlroland/commitlint-config";

  export default shlroland;
  `,
  [GitLintTools.CZG]: `
  import { shlroland } from "@shlroland/czg-config";

  export default shlroland;
  `,
  [GitLintTools.LINT_STAGED]: `
  import { shlroland } from "@shlroland/lint-staged-config";

  export default shlroland;
  `,
  [GitLintTools.HUSKY]: `
  import { shlroland } from "@shlroland/husky-config";

  export default shlroland;
  `,
}

function deleteConfig(filePath: string) {
  return fs.unlink(filePath)
}

export async function writeConfig(configs: CheckConfigResult[]) {
  const cwd = process.cwd()
  console.log(configs)
  for (const config of configs) {
    if (config.shouldOverride && config.exitedFilePath) {
      await deleteConfig(config.exitedFilePath)
    }
    const configFilePath = path.join(cwd, configFilePaths[config.choice])
    const configContent = configContents[config.choice]
    await fs.writeFile(configFilePath, configContent)
  }
}
