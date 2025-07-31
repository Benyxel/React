import React from 'react'
import "./App.css"
import TaskForm from './components/TaskForm'
import TaskColumn from './components/TaskColumn'
import Todoicon from './assets/direct-hit.png'
import Doingicon from './assets/glowing-star.png'
import Doneicon from './assets/check-mark-button.png'




const App = () => {
  return (
    <div className='app'>
      <TaskForm/>
      <main className='app_main'>
        <TaskColumn title='Todo' icon ={Todoicon}/>
        <TaskColumn title='Doing' icon ={Doingicon}/>
        <TaskColumn title='Done' icon ={Doneicon}/>

      </main>
    </div>
  )
}

export default App

