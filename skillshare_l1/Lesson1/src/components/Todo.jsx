
import React, { useState } from 'react';


const Todo = () => {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState("");
    const lessons = ['Lesson1', 'Lesson2', 'Lesson3'];

    const inputf = (event) => { 
       setInput(event.target.value)
    }
    
    const addLessons = () => {
        setCount(count +1)
    }

  return (
      <>
          <h1>Lessons: {count}</h1>
          <input placeholder='type here' onChange={inputf} />
          <button onClick={addLessons}>Add Lessons</button>
          <h1>{input}</h1>
        <ul>
          {lessons.map((lesson) => (
              <li>{lesson}</li>
          ))}
        </ul>
      </>
  )
}



export default Todo