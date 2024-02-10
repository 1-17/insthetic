const _readImage = image => {
  if (image) {
    return new Promise(resolve => {
      const reader = new FileReader()

      reader.onload = () => {
        const img = new Image()

        img.onload = () => {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")

          const size = 150
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

  throw new Error("Read Image: Missing image argument.")
}

export default _readImage
