import { useState } from 'react'
import Todo from './Components/Todo'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import { Routes, Route } from "react-router-dom"
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element = {<Signin />} />
      <Route path='/signup' element = {<Signup />} />
      <Route path='/todos' element = {<Todo />} />
    </Routes>
    </>
  )
}

export default App
