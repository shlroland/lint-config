import { css, js, md } from './presets'

const config = {
  '*.{ts,tsx}': js,
  '*.{js,jsx}': js,
  '*.{css,scss,sass,less}': css,
  '*.{md,mdx}': md,
}

export default config
module.exports = config
