import React from 'react'

export default function UpdateButton({handleFunction, componentName}) {
  return (
    <div>
        <button onClick={handleFunction}>Actualizar {componentName}</button>
    </div>
  )
}
