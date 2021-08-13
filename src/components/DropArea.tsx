import React from "react";
function DropArea({ children, onDrop }:any) {

  const handleDragOver = (e:any) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDrop = (e:any) => {
    e.stopPropagation()
    e.preventDefault()

    onDrop(e)
  }

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  )
}

export { DropArea }