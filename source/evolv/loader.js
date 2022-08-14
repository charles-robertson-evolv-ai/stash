console.log('[Evolv] Load')

document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="/assets.css">')

const assetsJS = document.createElement('script')
assetsJS.setAttribute('src', '/assets.js')
document.body.append(assetsJS)