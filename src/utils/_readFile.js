const _readFile = e => {
  const currentFile = e.target.files[0]

  if (currentFile) {
    return new Promise(resolve => {
      const reader = new FileReader()

      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(currentFile)
    })
  }
}

export default _readFile
