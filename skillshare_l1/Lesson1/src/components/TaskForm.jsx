
import React from 'react'

const TaskForm = () => {
  return (
    <div>
      <header className='app_header'>
        <form> 
          <input type='text' className='task_input' placeholder='Enter your task' />
          <div className='task_f_btn_l'>
            <button className='tag'> HTML </button>
            <button className='tag'> CSS</button>
            <button className='tag'> Javascripts</button>
            <button className='tag'> React</button>
            <button className='tag'> Python</button>
          </div>
        </form>
      </header>
    </div>
  )
}

export default TaskForm
