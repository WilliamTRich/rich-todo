import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const CreateTask = () => {

    return (
        <form className='create-task'>
            <input type="text" name="create" placeholder='Add Task...' />
            <Link to={TaskHeader} type='submit'>+</Link>
        </form>
    )
}

const TaskHeader = () => {

    return (
        <div className='task-header'>
            <p>To-Do List</p>
            <Link to={CreateTask} className='link'>Add Task</Link>
        </div>
    )
}

const Tasks = () => {

    return (
        <div className='tasks'>
            <TaskHeader />
            <ul>
                <li>Walk Dogs</li>
                <li>Feed Dogs</li>
                <li>Go grocery shopping</li>
                <li>Finish homework</li>
            </ul>
        </div>
    )
}

export { Tasks }