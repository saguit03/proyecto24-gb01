import React from 'react'

export default function DeleteButton({handleFunction, componentName}) {
  return (
    <button onClick={handleFunction}>Eliminar {componentName}</button>
  )
}
