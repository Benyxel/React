import React from 'react'
import './CardInput.css'

const CardInput = ({label, placeholder}) => {
  return (
      <div className='inputd'>
          <label>{label}</label>
          <input type='' placeholder={placeholder } /> 
    </div>
  )
}

export default CardInput