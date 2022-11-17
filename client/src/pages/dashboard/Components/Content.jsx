import React, { useState } from 'react';

//Components
import { TasksContainer } from './TasksContainer'

const Content = () => {

    return (
        <div className='content'>
            <TasksContainer />
        </div>
    )
}

export { Content }