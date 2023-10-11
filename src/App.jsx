import './App.css'
import { Routes, Route } from 'react-router-dom'
import Contexts from './pages/Contexts/Contexts'
import AddContext from './pages/AddContext/AddContext'
import Login from './pages/Login/Login'
// import Profile from './pages/Profile/Profile'
import React, { createContext, useState } from 'react'
// import Header from './components/Header/Header'
import Layout from './components/Layout'


export const UserContext = createContext();

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem('userStored')) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <>
      <UserContext.Provider
        value={{
          setIsLoggedIn: setIsLoggedIn,
          isLoggedIn: isLoggedIn
        }}>

        <Routes>
          <Route path="/" element={
            <Layout showHeader={isLoggedIn}>
              <React.Suspense fallback={<h2>Loading...</h2>}>
                {isLoggedIn ? <Contexts /> : <Login />}
              </React.Suspense>
            </Layout>
          } />
          <Route path="/add-context" element={
            <Layout showHeader={isLoggedIn}>
              <React.Suspense fallback={<h2>Loading...</h2>}><AddContext /></React.Suspense>
            </Layout>
          } />
          <Route path="/login" element={
            <Layout showHeader={isLoggedIn}>
              <React.Suspense fallback={<h2>Loading...</h2>}><Login /></React.Suspense>
            </Layout>
          } />
          {/* <Route path="/profile" element={
            <Layout showHeader={isLoggedIn}>
              <React.Suspense fallback={<h2>Loading...</h2>}><Profile /></React.Suspense>
            </Layout>
          } /> */}
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
