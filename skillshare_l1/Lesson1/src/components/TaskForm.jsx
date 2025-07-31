
import React from 'react'
import './TaskForm.css'
import Tag from './Tag'


const TaskForm = () => {
  return (
    <div>
      <header className='app_header'>
        <form> 
          <input type='text' className='task_input' placeholder='Enter your task' />

          <div className='task_f_btn_l'>
            <div>
              <Tag tagName='HTML' />
              <Tag tagName='CSS'/>
              <Tag tagName='JavaScript'/>
              <Tag tagName='Python'/>
              <Tag tagName='Node.js'/>
            
            </div>
            
            <div>
            <select className='task_status'> 
              <option value='todo' key=' '>To do</option>
              <option value='doing' key=''>Doing</option>
              <option value='done' key=''>Done </option>
            </select>
            <button type='submit' className='task_submit'> + Add Task</button>
            </div>
          </div>
        </form>
      </header>
    </div>
  )
}

export default TaskForm
