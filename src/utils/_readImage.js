const _readImage = (e, imageSize) => {
  if (!e) {
    throw new Error("Read Image: Missing event argument.")
  }

  if (!imageSize) {
    switch (e.target.name) {
      case /* highlight */ "cover":
        imageSize = 200
        break
      
      case /* post */ "image":
        imageSize = 400
        break
      
      case /* profile */ "avatar":
        imageSize = 200
        break
    }
  }

  const image = e.target.files[0]
  
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = () => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement("canvas")
        const canvasContext = canvas.getContext("2d")
        
        let width = img.width
        let height = img.height

        const scaleFactor = Math.min(imageSize / width, imageSize / height)

        width *= scaleFactor
        height *= scaleFactor

        canvas.width = width
        canvas.height = height

        canvasContext.drawImage(img, 0, 0, width, height)

        const compressedDataURL = canvas.toDataURL(image.type, 0.7)

        resolve(compressedDataURL)
      }

      img.src = reader.result
    }

    reader.readAsDataURL(image)
  })
}

export default _readImage
