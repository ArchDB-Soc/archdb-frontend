import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import AddContext from './pages/AddContext/AddContext'

function App() {


  return (
    <>
      <header>
        <h1>The IADB ⛏️</h1>
        <nav>
          <Link to="/">Get Contexts</Link>
          <Link to="/add-context">Add Context</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-context" element={<AddContext />} />
      </Routes>

    </>
  )
}

export default App
