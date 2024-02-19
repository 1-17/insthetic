const _readImage = (e, imageSize) => {
  const image = e.target.files[0]
  
  if (!imageSize) {
    switch (e.target.name) {
      case "cover" /* highlight */:
        imageSize = 200
        break
      
      case "image" /* post */:
        imageSize = 400
        break
      
      case "avatar" /* profile picture */:
        imageSize = 200
        break
    }
  }
  
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = () => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        const size = imageSize
        let width = img.width
        let height = img.height

        const scaleFactor = Math.min(size / width, size / height)

        width *= scaleFactor
        height *= scaleFactor

        canvas.width = width
        canvas.height = height

        ctx.drawImage(img, 0, 0, width, height)

        const compressedDataURL = canvas.toDataURL(image.type, 0.7)

        resolve(compressedDataURL)
      }

      img.src = reader.result
    }

    reader.readAsDataURL(image)
  })
}

export default _readImage
