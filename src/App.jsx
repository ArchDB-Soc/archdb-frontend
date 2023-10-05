import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Contexts from './pages/Contexts/Contexts'
import AddContext from './pages/AddContext/AddContext'
import Login from './pages/Login/Login'

function App() {


  return (
    <>
      <header>
        <h1>The IADB ⛏️</h1>
        <nav>
          <Link to="/">Contexts</Link>
          <Link to="/add-context">Add Context</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Contexts />} />
        <Route path="/add-context" element={<AddContext />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  )
}

export default App
