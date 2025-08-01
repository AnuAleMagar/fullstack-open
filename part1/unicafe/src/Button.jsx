import React from 'react'

function Button({handleClick,content}) {
  return (
    <button onClick={handleClick}>{content}</button>
  )
}

export default Button