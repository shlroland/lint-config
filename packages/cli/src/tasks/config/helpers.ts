export function esmConfigFactory(exportContent: string, importContent: string) {
  return `
  ${importContent}

  export default ${exportContent}
  `
}

export function cjsConfigFactory(exportContent: string, importContent: string) {
  return `
  ${importContent}

  module.exports = ${exportContent}
  `
}
