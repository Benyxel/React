import React from 'react'
import "./App.css"
import TaskForm from './components/TaskForm'


const App = () => {
  return (
    <div className='app'>
      <TaskForm/>
      <header className='app_header'>Header Section</header>
      <main className='app_main'>
        <section className='task_colume'>Section 1</section>
        <section className='task_colume'>Section 2</section>
        <section className='task_colume'>Section 3</section>
      </main>
    </div>
  )
}

export default App

