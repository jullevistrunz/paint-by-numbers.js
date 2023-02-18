const fs = require('fs')
const pixels = require('image-pixels')

const imgDir = fs.readdirSync('images')
let imgArr = []

async function init() {
  for (let i = 0; i < imgDir.length; i++) {
    const { data, width, height } = await pixels(`images/${imgDir[i]}`)
    imgArr.push(data)
  }

  fs.writeFileSync(
    'images.js',
    `const imagesDir = ${JSON.stringify(
      imgDir
    )}; const imagesArr = ${JSON.stringify(imgArr)}`
  )
}
init()
