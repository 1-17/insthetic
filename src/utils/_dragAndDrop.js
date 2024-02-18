import { useState } from "react"

const _dragAndDrop = ({ items, itemId, update }) => {
  const [_itemId, setItemId] = useState(null)
  
  const dragStart = e => {
    e.dataTransfer.setData("dragItemId", itemId)
    setItemId(itemId)
  }

  const dragOver = e => e.preventDefault()

  const drop = e => new Promise(resolve => {
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
    onDragStart: dragStart,
    onDragOver: dragOver,
    onDrop: e => drop(e).then(update)
  }
}

export default _dragAndDrop
