import {React, useState} from 'react'
import "./App.css"
import TaskForm from './components/TaskForm'
import TaskColumn from './components/TaskColumn'
import Todoicon from './assets/direct-hit.png'
import Doingicon from './assets/glowing-star.png'
import Doneicon from './assets/check-mark-button.png'





const App = () => {
  const [tasks, setTasks] = useState([])
  console.log("task", tasks)
  return (
    <div className='app'>
      <TaskForm setTasks={ setTasks} />
      <main className='app_main'>
        <TaskColumn title='Todo' icon={Todoicon} tasks={tasks} status = "todo"/>
        <TaskColumn title='Doing' icon ={Doingicon} tasks={tasks} status = "doing"/>
        <TaskColumn title='Done' icon ={Doneicon} tasks={tasks} status = "done"/>

      </main>
    </div>
  )
}

export default App

