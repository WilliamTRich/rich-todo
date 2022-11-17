import React, { useState } from 'react';

//Components
import { Tasks } from './Tasks'

const TasksContainer = () => {

    return (
        <div className='tasks-container'>
            <Tasks />
        </div>
    )
}

export { TasksContainer }