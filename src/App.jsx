import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Contexts from './pages/Contexts/Contexts'
import AddContext from './pages/AddContext/AddContext'

function App() {


  return (
    <>
      <header>
        <h1>The IADB ⛏️</h1>
        <nav>
          <Link to="/">Contexts</Link>
          <Link to="/add-context">Add Context</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Contexts />} />
        <Route path="/add-context" element={<AddContext />} />
      </Routes>

    </>
  )
}

export default App
