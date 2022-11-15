import React, { useContext } from 'react'

//Components
import { Register } from './Components/Register'
import { LogIn } from './Components/LogIn'

//Style
import './SignIn.scss'

const SignIn = () => {

    return (
        <div className='container'>
            <Register />
            <LogIn />
        </div>
    )
}
export { SignIn };