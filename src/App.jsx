import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import Contexts from './pages/Contexts/Contexts'
import AddContext from './pages/AddContext/AddContext'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'

function App() {

  const userStored = JSON.parse(localStorage.getItem('userStored'))


  return (
    <>
      <header>
        <nav className="login">
          {userStored ? <NavLink to="/profile">Profile 🙋🏻‍♀️</NavLink> : null}
          <NavLink to="/login">Login 🔐</NavLink>
        </nav>
        <h1>The IADB ⛏️</h1>
        <nav>
          <NavLink to="/">Contexts</NavLink>
          {userStored ? <NavLink to="/add-context">Add Context</NavLink> : null}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Contexts />} />
        <Route path="/add-context" element={<AddContext />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </>
  )
}

export default App
