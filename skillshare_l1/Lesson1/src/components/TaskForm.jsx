
import React from 'react'
import './TaskForm.css'


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

            <select className='task_status'> 
              <option value='todo' key=' '>To do</option>
              <option value='doing' key=''>Doing</option>
              <option value='done' key=''>Done </option>
            </select>

            <button type='submit' className='task_submit'> + Add Task</button>
          </div>
        </form>
      </header>
    </div>
  )
}

export default TaskForm
