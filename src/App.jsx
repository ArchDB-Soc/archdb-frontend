import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { createContext, lazy, useState } from 'react'
import Layout from './components/Layout'

export const UserContext = createContext();

const Sites = lazy(() => import('./pages/Sites/Sites'))
const AddSite = lazy(() => import('./pages/AddSite/AddSite'))
const Sets = lazy(() => import('./pages/Sets/Sets'))
const AddSet = lazy(() => import('./pages/AddSet/AddSet'))
const Records = lazy(() => import('./pages/Records/Records'))
const AddRecord = lazy(() => import('./pages/AddRecord/AddRecord'))
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
          {isLoggedIn ?
            <Route path="/" element={
              <Layout showHeader>
                <React.Suspense fallback={<h2>Loading...</h2>}><Sites /></React.Suspense>
              </Layout>
            } /> :
            <Route path="/" element={
              <Layout >
                <React.Suspense fallback={<h2>Loading...</h2>}><Login /></React.Suspense>
              </Layout>
            } />
          }
          <Route path="/add-site" element={
            <Layout showHeader={isLoggedIn}>
              <React.Suspense fallback={<h2>Loading...</h2>}><AddSite /></React.Suspense>
            </Layout>
          } />
          <Route path="/sets" element={
            <Layout showHeader={isLoggedIn}>
              <React.Suspense fallback={<h2>Loading...</h2>}><Sets /></React.Suspense>
            </Layout>
          } />
          <Route path="/add-set" element={
            <Layout showHeader={isLoggedIn}>
              <React.Suspense fallback={<h2>Loading...</h2>}><AddSet /></React.Suspense>
            </Layout>
          } />
          <Route path="/records" element={
            <Layout showHeader={isLoggedIn}>
              <React.Suspense fallback={<h2>Loading...</h2>}>
                {isLoggedIn ? <Records /> : <Login />}
              </React.Suspense>
            </Layout>
          } />
          <Route path="/add-record" element={
            <Layout showHeader={isLoggedIn}>
              <React.Suspense fallback={<h2>Loading...</h2>}><AddRecord /></React.Suspense>
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
