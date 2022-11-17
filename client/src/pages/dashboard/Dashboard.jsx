import React, { useContext } from 'react'
import '../dashboard/Dashboard.scss'

//Context
import { UserContext } from '../../contexts/UserContext'

//Components
import { Nav } from './Components/Nav'
import { Content } from './Components/Content'

const Dashboard = () => {

    const { user, setUser } = useContext(UserContext)

    return (
        <div className='container'>
            <Nav />
            <Content />
        </div>
    )
}
export { Dashboard };