import React from 'react'
import './css/Tag.css'


const Tag = ({tagName, selectTags, selected }) => {
  const tagStyle = {
    HTML: { backgroundColor: "#fda821" },
    CSS: { backgroundColor: "#15B4C8" },
    JavaScript: { backgroundColor: "#ffd12c" },
    Python: { backgroundColor: "#928decff" },
    "Node.js": { backgroundColor: "#9fe445ff" },
    default: { backgroundColor: "#f9f9f9" }
  }
  return (
    <button type='button'
      className='tag'
      style={selected ? tagStyle[tagName] : tagStyle.default}
      onClick={() => selectTags(tagName)}>
      {tagName}
    </button>
  )
}

export default Tag