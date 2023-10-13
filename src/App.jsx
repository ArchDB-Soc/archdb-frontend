import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { createContext, lazy, useState } from 'react'
import Layout from './components/Layout'


export const UserContext = createContext();

const Contexts = lazy(() => import('./pages/Contexts/Contexts'))
const AddContext = lazy(() => import('./pages/AddContext/AddContext'))
const Login = lazy(() => import('./pages/Login/Login'))


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
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
