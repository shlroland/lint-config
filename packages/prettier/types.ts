export interface PrinterOptions {
  /**
   * Specify the line length that the printer will wrap on.
   * @default 80
   */
  printWidth: number
  /**
   * Specify the number of spaces per indentation-level.
   * @default 2
   */
  tabWidth: number
  /**
   * Indent lines with tabs instead of spaces
   * @default false
   */
  useTabs: boolean
  parentParser?: string | undefined
  __embeddedInHtml?: boolean | undefined
}

export interface Options extends Partial<RequiredOptions> {}

export interface RequiredOptions extends PrinterOptions {
  /**
   * Print semicolons at the ends of statements.
   * @default true
   */
  semi: boolean
  /**
   * Use single quotes instead of double quotes.
   * @default false
   */
  singleQuote: boolean
  /**
   * Use single quotes in JSX.
   * @default false
   */
  jsxSingleQuote: boolean
  /**
   * Print trailing commas wherever possible.
   * @default 'es5'
   */
  trailingComma: 'none' | 'es5' | 'all'
  /**
   * Print spaces between brackets in object literals.
   * @default true
   */
  bracketSpacing: boolean
  /**
   * Put the `>` of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being
   * alone on the next line (does not apply to self closing elements).
   * @default false
   */
  bracketSameLine: boolean
  /**
   * Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line.
   * @default false
   * @deprecated use bracketSameLine instead
   */
  jsxBracketSameLine: boolean
  /**
   * Format only a segment of a file.
   * @default 0
   */
  rangeStart: number
  /**
   * Format only a segment of a file.
   * @default Infinity
   */
  rangeEnd: number
  /**
   * Specify which parser to use.
   */
  parser: LiteralUnion<BuiltInParserName> | CustomParser
  /**
   * Specify the input filepath. This will be used to do parser inference.
   */
  filepath: string
  /**
   * Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file.
   * This is very useful when gradually transitioning large, unformatted codebases to prettier.
   * @default false
   */
  requirePragma: boolean
  /**
   * Prettier can insert a special @format marker at the top of files specifying that
   * the file has been formatted with prettier. This works well when used in tandem with
   * the --require-pragma option. If there is already a docblock at the top of
   * the file then this option will add a newline to it with the @format marker.
   * @default false
   */
  insertPragma: boolean
  /**
   * By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer.
   * In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out.
   * @default 'preserve'
   */
  proseWrap: 'always' | 'never' | 'preserve'
  /**
   * Include parentheses around a sole arrow function parameter.
   * @default 'always'
   */
  arrowParens: 'avoid' | 'always'
  /**
   * Provide ability to support new languages to prettier.
   */
  plugins: Array<string | Plugin>
  /**
   * Specify plugin directory paths to search for plugins if not installed in the same `node_modules` where prettier is located.
   */
  pluginSearchDirs: string[]
  /**
   * How to handle whitespaces in HTML.
   * @default 'css'
   */
  htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore'
  /**
   * Which end of line characters to apply.
   * @default 'lf'
   */
  endOfLine: 'auto' | 'lf' | 'crlf' | 'cr'
  /**
   * Change when properties in objects are quoted.
   * @default 'as-needed'
   */
  quoteProps: 'as-needed' | 'consistent' | 'preserve'
  /**
   * Whether or not to indent the code inside <script> and <style> tags in Vue files.
   * @default false
   */
  vueIndentScriptAndStyle: boolean
  /**
   * Control whether Prettier formats quoted code embedded in the file.
   * @default 'auto'
   */
  embeddedLanguageFormatting: 'auto' | 'off'
}

export type LiteralUnion<T extends U, U = string> =
  | T
  | (Pick<U, never> & { _?: never | undefined })

export type BuiltInParserName =
  | 'angular'
  | 'babel-flow'
  | 'babel-ts'
  | 'babel'
  | 'css'
  | 'espree'
  | 'flow'
  | 'glimmer'
  | 'graphql'
  | 'html'
  | 'json-stringify'
  | 'json'
  | 'json5'
  | 'less'
  | 'lwc'
  | 'markdown'
  | 'mdx'
  | 'meriyah'
  | 'scss'
  | 'typescript'
  | 'vue'
  | 'yaml'

export type BuiltInParser = (text: string, options?: any) => any

export type BuiltInParsers = Record<BuiltInParserName, BuiltInParser>

export type CustomParser = (
  text: string,
  parsers: BuiltInParsers,
  options: Options,
) => any
