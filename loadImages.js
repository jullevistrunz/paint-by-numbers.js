const fs = require('fs')
const PNG = require('png-js')

const imgDir = fs.readdirSync('images')
let imgArr = []

for (let i = 0; i < imgDir.length; i++) {
  PNG.decode(`images/${imgDir[i]}`, function (pixels) {
    imgArr.push(pixels)
    if (i == imgDir.length - 1) {
      fs.writeFileSync(
        'images.js',
        `const imagesDir = ${JSON.stringify(
          imgDir
        )}; const imagesArr = ${JSON.stringify(imgArr)}`
      )
    }
  })
}
