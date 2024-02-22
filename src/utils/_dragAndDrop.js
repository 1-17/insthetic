import { useState } from "react"

const _dragAndDrop = ({ items, itemId, update }) => {
  if (!items) {
    throw new Error("Drag and Drop: Missing items argument.")
  }
  
  if (!itemId) {
    throw new Error("Drag and Drop: Missing itemId argument.")
  }

  const [_itemId, setItemId] = useState(null)
  
  const onDragStart = e => {
    e.dataTransfer.setData("dragItemId", itemId)
    setItemId(itemId)
  }

  const onDragOver = e => e.preventDefault()

  const onDrop = e => new Promise(resolve => {
    const findItemIndex = i => items.findIndex(item => item.id === i)
    const dragItemId = Number(e.dataTransfer.getData("dragItemId"))
  
    const dragItemIndex = findItemIndex(dragItemId)
    const dropItemIndex = findItemIndex(itemId)
  
    const itemsList = [...items]
    const [draggedItem] = itemsList.splice(dragItemIndex, 1)
    itemsList.splice(dropItemIndex, 0, draggedItem)
  
    resolve(itemsList)
    setItemId(null)
  })

  return {
    draggable: true,
    onDragStart,
    onDragOver,
    onDrop: e => onDrop(e).then(update)
  }
}

export default _dragAndDrop
