import { useState, createContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import axios from 'axios';

//Pages
import { SignIn } from './pages/sign-in/SignIn'
import { Dashboard } from './pages/dashboard/Dashboard'

//Style
import './App.scss'

function App() {

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect( () => {
    const token = localStorage.getItem( "token" );
    console.log( token );

    const settings = {
      headers : {
        something : token
      }
    }
    axios.get( 'http://localhost:8000/api/validate', settings )
      .then( response => {
        const loadUserInfo = response.data.decoded;
        setUser( loadUserInfo );
      })
      .catch( err => {
        navigate( '/' );
      });
  }, [])
  
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

