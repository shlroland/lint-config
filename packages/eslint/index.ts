import type {
  Awaitable,
  OptionsConfig,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import { antfu } from '@antfu/eslint-config'

function shlroland(
  options?: OptionsConfig & Omit<TypedFlatConfigItem, 'files'>,
  ...userConfigs: Awaitable<
    | TypedFlatConfigItem
    | TypedFlatConfigItem[]
    | FlatConfigComposer<any, any>
    | Linter.Config[]
  >[]
) {
  return antfu(
    {
      ...{
        formatters: true,
      },
      ...{
        rules: {
          'node/prefer-global/process': 'off',
        },
      },
      ...options,
    },
    ...userConfigs,
  )
}

export { shlroland, shlroland as default }

export {
  astro,
  type Awaitable,
  combine,
  command,
  comments,
  type ConfigNames,
  defaultPluginRenaming,
  disables,
  ensurePackages,
  formatters,
  getOverrides,
  GLOB_ALL_SRC,
  GLOB_ASTRO,
  GLOB_ASTRO_TS,
  GLOB_CSS,
  GLOB_EXCLUDE,
  GLOB_GRAPHQL,
  GLOB_HTML,
  GLOB_JS,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_JSONC,
  GLOB_JSX,
  GLOB_LESS,
  GLOB_MARKDOWN,
  GLOB_MARKDOWN_CODE,
  GLOB_MARKDOWN_IN_MARKDOWN,
  GLOB_POSTCSS,
  GLOB_SCSS,
  GLOB_SRC,
  GLOB_SRC_EXT,
  GLOB_STYLE,
  GLOB_SVELTE,
  GLOB_SVG,
  GLOB_TESTS,
  GLOB_TOML,
  GLOB_TS,
  GLOB_TSX,
  GLOB_VUE,
  GLOB_XML,
  GLOB_YAML,
  ignores,
  imports,
  interopDefault,
  isInEditorEnv,
  isInGitHooksOrLintStaged,
  isPackageInScope,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  markdown,
  node,
  type OptionsComponentExts,
  type OptionsConfig,
  type OptionsFiles,
  type OptionsFormatters,
  type OptionsHasTypeScript,
  type OptionsIsInEditor,
  type OptionsOverrides,
  type OptionsProjectType,
  type OptionsRegExp,
  type OptionsStylistic,
  type OptionsTypescript,
  type OptionsTypeScriptParserOptions,
  type OptionsTypeScriptWithTypes,
  type OptionsUnicorn,
  type OptionsUnoCSS,
  type OptionsVue,
  parserPlain,
  perfectionist,
  react,
  regexp,
  renamePluginInConfigs,
  renameRules,
  type ResolvedOptions,
  resolveSubOptions,
  type Rules,
  solid,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  type StylisticConfig,
  StylisticConfigDefaults,
  type StylisticOptions,
  svelte,
  test,
  toArray,
  toml,
  type TypedFlatConfigItem,
  typescript,
  unicorn,
  unocss,
  vue,
  yaml,
} from '@antfu/eslint-config'
