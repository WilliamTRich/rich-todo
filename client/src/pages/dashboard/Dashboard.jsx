import React, { useContext } from 'react'
import '../dashboard/Dashboard.scss'

//Components
import { Nav } from './Components/Nav'
import { Content } from './Components/Content'

const Dashboard = () => {

    return (
        <div className='container'>
            <Nav />
            <Content />
        </div>
    )
}
export { Dashboard };