import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

//Contexts
import { UserContext } from '../../../contexts/UserContext'

const Nav = () => {

    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate('/')
    }

    return (
        (user) ?
            (<div className='nav'>
                <h2>{user.userName}</h2>
                <button onClick={clickHandler}>Log Out</button>
            </div>)
            :
            (
                <h2>
                    loading
                </h2>
            )

    )
}

export { Nav }