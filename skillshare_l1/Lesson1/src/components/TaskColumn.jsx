import React from 'react'
import './TaskColumn.css'
import Todo from '../assets/direct-hit.png'



const TaskColumn = () => {
  return (
    <section className='task_column'>
      <h2 className='task_column_h'>
        <img className='task_column_img' src={Todo} alt='' />Todo</h2>
    </section>
  )
}

export default TaskColumn