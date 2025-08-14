import React from 'react'
import { useState } from 'react'

const home = () => {
    const [isGoing, setIsGoing] = useState()

    function mindset () {
        setIsGoing (prev => !prev)
    };

  return (
    <div>
      <h1>Do I feel like Going out to night?</h1>
        <button onClick={mindset}> { isGoing ? "Yes" : "Nooo" } </button>
    </div>
  )
}

export default home
