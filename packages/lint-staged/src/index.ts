import { js, md, prettierCSS, stylelintCSS } from './presets'

const config = (haveStyleLint?: boolean) => ({
  '*.{ts,tsx}': js,
  '*.{js,jsx}': js,
  '*.{css,scss,sass,less}': haveStyleLint ? stylelintCSS : prettierCSS,
  '*.{md,mdx}': md,
})

export default config
module.exports = config
