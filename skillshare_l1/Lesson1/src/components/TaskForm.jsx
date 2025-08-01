
import React, {useState} from 'react'
import './css/TaskForm.css'
import Tag from './Tag'


const TaskForm = () => {
  const [task, setTask] = useState("")
  const [status, setStatus] = useState("todo")
 

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleTask = (e) => {
    setTask(e.target.value)
  }

  return (
    <div>
      <header className='app_header'>
        <form> 
          <input
            type='text'
            className='task_input'
            placeholder='Enter your task'
            onChange={ handleTask}
          /> 
          <h1>{status}</h1>

          <div className='task_f_btn_l'>
            <div>
              <Tag tagName='HTML' />
              <Tag tagName='CSS'/>
              <Tag tagName='JavaScript'/>
              <Tag tagName='Python'/>
              <Tag tagName='Node.js'/>
            
            </div>
           
            <div>
            <select className='task_status' onChange={handleStatus}> 
              <option className='opt' value='todo' key=' '>To do</option>
              <option className='opt'value='doing' key=''>Doing</option>
              <option className='opt' value='done' key=''>Done </option>
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
