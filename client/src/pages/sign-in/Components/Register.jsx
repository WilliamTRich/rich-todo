import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


//Contexts
import { UserContext } from '../../../contexts/UserContext'

//Components
import { Form } from './Form'

const Register = () => {

    const { user, setUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()

    const registerUser = user => {
        axios.post('http://localhost:8000/api/register', user)
            .then(res => {
                localStorage.setItem('token', res.data.accessToken)
                setUser({
                    userName: res.data.userName,
                    userId: res.data.userId
                })
                navigate('/dashboard')
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <Form mode='register' onSubmit={registerUser} errorState={[errors, setErrors]} />
        </div>
    )
}

export { Register }