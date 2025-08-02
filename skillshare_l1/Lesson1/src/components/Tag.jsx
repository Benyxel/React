import React from 'react'
import './css/Tag.css'


const Tag = ({tagName, selectTags}) => {
  return (
    <button type='button' className='tag' onClick={() => selectTags(tagName)}> {tagName} </button>
  )
}

export default Tag