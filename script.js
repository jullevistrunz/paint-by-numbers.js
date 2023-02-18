// display images from ./images using ./images.js
if (imagesDir) {
  document.getElementById('selectImgContainer').innerHTML = ''
}
for (let i = 0; i < imagesDir.length; i++) {
  const img = new Image()
  img.src = `images/${imagesDir[i]}`
  img.id = `image${i}`
  img.classList.add('selectImg')
  img.style.width = '150px'
  img.addEventListener('click', () => selectImg(i))
  document.getElementById('selectImgContainer').appendChild(img)
}
let img = []
function selectImg(index) {
  document.getElementById('selectImgWrapper').remove()
  //rewrite imagesArr
  //loop each pixel in selected image
  for (let i = 0; i < Object.keys(imagesArr[index]).length / 4; i++) {
    img.push([
      imagesArr[index][i * 4],
      imagesArr[index][i * 4 + 1],
      imagesArr[index][i * 4 + 2],
    ])
  }
  startGame()
}

function startGame() {
  const width = Math.sqrt(img.length)
  document.getElementById('gameCanvas').style.width = `${width * 50}px`
  document.getElementById('gameCanvas').style.height = `${width * 50}px`
  for (let i = 0; i < img.length; i++) {
    const el = document.createElement('div')
    el.id = `pixelInGameCanvas${i}`
    el.classList.add('pixelInGameCanvas')
    el.classList.add('notUsed')
    el.style.width = `50px`
    el.style.height = `50px`
    document.getElementById('gameCanvas').appendChild(el)
  }

  let pallet = Array.from(new Set(img.map(JSON.stringify)), JSON.parse)
  let selectedColor
  for (let i = 0; i < pallet.length; i++) {
    const color = `rgb(${pallet[i][0]}, ${pallet[i][1]}, ${pallet[i][2]})`
    const el = document.createElement('div')
    el.id = `pixelInColorPallet${i}`
    el.classList.add('pixelInColorPallet')
    el.style.backgroundColor = color
    el.style.width = `50px`
    el.style.height = `50px`
    el.innerHTML = `<div>${i + 1}</div>`
    el.addEventListener('click', () => {
      !document.getElementsByClassName('selected')[0] ||
        document
          .getElementsByClassName('selected')[0]
          .classList.remove('selected')
      el.classList.add('selected')
      selectedColor = pallet[i]
      startPainting(selectedColor)
    })
    for (let j = 0; j < img.length; j++) {
      if (JSON.stringify(img[j]) == JSON.stringify(pallet[i])) {
        document.getElementById(`pixelInGameCanvas${j}`).innerHTML = `<div>${
          i + 1
        }</div>`
      }
    }
    document.getElementById('colorPallet').appendChild(el)
  }
  document.getElementById('unselect').addEventListener('click', () => {
    for (let i = 0; i < img.length; i++) {
      document.getElementById(`pixelInGameCanvas${i}`).classList.add('notUsed')
    }
    for (let i = 0; i < pallet.length; i++) {
      document
        .getElementById(`pixelInColorPallet${i}`)
        .classList.remove('selected')
    }
    selectedColor = null
  })
  document.getElementById('gameWrapper').style.visibility = 'visible'
}

function startPainting(color) {
  for (let i = 0; i < img.length; i++) {
    document.getElementById(`pixelInGameCanvas${i}`).classList.remove('notUsed')
    if (JSON.stringify(img[i]) != JSON.stringify(color)) {
      document.getElementById(`pixelInGameCanvas${i}`).classList.add('notUsed')
    } else {
      document
        .getElementById(`pixelInGameCanvas${i}`)
        .addEventListener('click', paintPixel)
    }
  }
}

function paintPixel(event) {
  const index = (event.target.id || event.target.parentElement.id).slice(
    'pixelInGameCanvas'.length
  )
  document.getElementById(`pixelInGameCanvas${index}`).innerHTML = ''
  document.getElementById(`pixelInGameCanvas${index}`).classList.add('painted')
  document.getElementById(
    `pixelInGameCanvas${index}`
  ).style.backgroundColor = `rgb(${img[index][0]}, ${img[index][1]}, ${img[index][2]})`
  document
    .getElementById(`pixelInGameCanvas${index}`)
    .removeEventListener('click', paintPixel)
}
