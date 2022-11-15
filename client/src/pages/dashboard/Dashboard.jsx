import React, { useContext } from 'react'

//Context
import { UserContext } from '../../contexts/UserContext'

const Dashboard = () => {

    const { user, setUser } = useContext(UserContext)

    return (
        <div className='container'>
            <h1>Hello {user.userName}</h1>
        </div>
    )
}
export { Dashboard };