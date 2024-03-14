import './App.css'
import Homepage from './pages/Homepage'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App
