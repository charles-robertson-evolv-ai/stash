const jsdom = require("jsdom")
const { JSDOM } = jsdom

function modifyHead(content, outputPath) {
  const dom = new JSDOM(content)
  
  dom.window.document.head.querySelectorAll('meta[http-equiv="Content-Security-Policy"]').forEach(csp => csp.remove())
  dom.window.document.head.insertAdjacentHTML('beforeend', '<script src="/loader.js" defer></script>')

  return dom.serialize()
}

module.exports = {
  modifyHead
}