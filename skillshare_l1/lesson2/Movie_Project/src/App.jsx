import React from 'react'
import "./App.css"
import NavBar from './components/NavBar'
import MovieList from './components/MovieList'


const App = () => {
  return (
    <div className='app'>
      <NavBar />
      

      <MovieList />
    </div>
  )
}

export default App
