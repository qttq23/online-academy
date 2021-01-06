import React from 'react'

import './style.css'

const Label = (props) => {
  return (
    <div className={'label ' + props.className}>
      <p>{props.children}</p>
    </div>
  )
}