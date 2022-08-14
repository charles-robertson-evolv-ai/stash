const fs = require('fs')
const sass = require('sass')

const config = JSON.parse(fs.readFileSync('./source/evolv/evolv-config.json', {encoding: 'utf8', flag:'r'}))

const inputDir = './source/evolv'
const outputDir = './serve'

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, 0744);
}

if (config.context.active) {
  let assetsCSS = sass.compile(`${inputDir}/context/context.scss`).css

  config.context.concepts.forEach(concept => {
    concept.variants.forEach(variant => {
      const id = concept.id + variant.id
      const variantSCSSFile = `${inputDir}/context/${id}/${id}.scss`
      
      if (fs.existsSync(variantSCSSFile)) {
        const variantCSS = sass.compile(variantSCSSFile).css
        assetsCSS = assetsCSS + "\n\n" + variantCSS
      }
    })
  })

  try {
    fs.writeFileSync(`${outputDir}/assets.css`, assetsCSS)
    console.log(`[evolv-css] write ${outputDir}/assets.css`)
  } catch(err) {
    throw err
  }
}
