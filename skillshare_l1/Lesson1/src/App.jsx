import  {React, useState, useEffect} from 'react'
import "./App.css"
import TaskForm from './components/TaskForm'
import TaskColumn from './components/TaskColumn'
import Todoicon from './assets/direct-hit.png'
import Doingicon from './assets/glowing-star.png'
import Doneicon from './assets/check-mark-button.png'




const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  console.log("task", tasks)

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}, [tasks])

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex)
    setTasks(newTasks)
  }

  return (
    <div className='app'>
      <TaskForm setTasks={ setTasks} />
      <main className='app_main'>
        <TaskColumn title='Todo' icon={Todoicon} tasks={tasks} status = "todo" handleDelete= {handleDelete} />
        <TaskColumn title='Doing' icon ={Doingicon} tasks={tasks} status = "doing" handleDelete= {handleDelete} />
        <TaskColumn title='Done' icon ={Doneicon} tasks={tasks} status = "done" handleDelete= {handleDelete} />

      </main>
    </div>
  )
}

export default App

