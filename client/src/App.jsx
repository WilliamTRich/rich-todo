import { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'

//Pages
import { SignIn } from './pages/sign-in/SignIn'
import { Dashboard } from './pages/dashboard/Dashboard'

//Style
import './App.scss'

function App() {

  const [user, setUser] = useState({})

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export { App }

