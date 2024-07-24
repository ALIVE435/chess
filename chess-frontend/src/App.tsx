import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from "./screens/Game.tsx"
import Landing from "./screens/Landing.tsx"
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/game' element={<Game/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
