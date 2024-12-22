import React from 'react'

export default function AddButton({handleFunction, componentName}) {
  return (
    <button onClick={handleFunction}>Añadir {componentName}</button>
    
  )
}
