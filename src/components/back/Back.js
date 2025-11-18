import React from 'react'
import './Back.css'


export const Back = ({back}) => {
  return (
    <button className='back-button' onClick={back}>←</button>
  )
}
