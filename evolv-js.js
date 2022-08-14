const fs = require('fs')

const catalyst = fs.readFileSync('./source/evolv/integrations/catalyst.js', {encoding:'utf8', flag:'r'})
const config = JSON.parse(fs.readFileSync('./source/evolv/evolv-config.json', {encoding: 'utf8', flag:'r'}))

const inputDir = './source/evolv'
const outputDir = './serve'

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, 0744);
}

fs.copyFile(`${inputDir}/loader.js`, `${outputDir}/loader.js`, (err) => {
  if (err) throw err
})

function iife(code) {
  return `(() => {
  ${code}
})();`
}

if (config.context.active) {
  let assetsJS = catalyst + '\n\n'
  assetsJS += iife(fs.readFileSync(`${inputDir}/context/context.js`, {encoding:'utf8', flag:'r'}))

  config.context.concepts.forEach(concept => {
    concept.variants.forEach(variant => {
      const id = concept.id + variant.id
      const variantJSFile = `${inputDir}/context/${id}/${id}.js`
      
      if (fs.existsSync(variantJSFile)) {
        const variantJSCode = iife(fs.readFileSync(variantJSFile), {encoding: 'utf8', flag:'r'})
        assetsJS = assetsJS + '\n\n' + variantJSCode
      }
    })
  })

  try {
    fs.writeFileSync(`${outputDir}/assets.js`, assetsJS)
    console.log(`[evolv-js] write ${outputDir}/assets.js`)
  } catch(err) {
    throw err
  }
}
