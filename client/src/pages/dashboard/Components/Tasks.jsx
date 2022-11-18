import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'

//Contexts
import { UserContext } from '../../../contexts/UserContext'

const CreateTask = props => {

    const [header, setHeader] = props.headerState
    const [loaded, setLoaded] = props.loadedState
    const { user, setUser } = useContext(UserContext)
    const [task, setTask] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const userId = user._id

        axios.post('http://localhost:8000/api/create', { task, userId })
            .then(res => {
                setLoaded(false)
                setHeader(true)
            })
            .catch(err => console.log(err))

    }


    return (
        <form className='create-task' onSubmit={handleSubmit}>
            <input type="text" name="task" value={task} onChange={e => setTask(e.target.value)} placeholder='Add Task...' />
            <button type='submit'>+</button>
        </form>
    )
}

const TaskHeader = props => {

    const [header, setHeader] = props.headerState

    const handleClick = e => {
        e.preventDefault()
        setHeader(false)
    }

    return (
        <div className='task-header'>
            <p>To-Do List</p>
            <button onClick={handleClick}>Add Task</button>
        </div>
    )
}

const Tasks = () => {

    const [header, setHeader] = useState(true)
    const [tasks, setTasks] = useState([])
    const [loaded, setLoaded] = useState(false)
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        axios.post('http://localhost:8000/api/user', { userName: user.userName })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.post('http://localhost:8000/api/gettasks', { userId: user._id })
            .then(res => {
                setTasks(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [loaded])

    const onClickHandler = id => {
        axios.delete(`http://localhost:8000/api/task/delete/${id}`)
            .then(res => {
                setLoaded(false)
            })
            .catch(err => console.log(err))
    }

    if (loaded) {
        return (
            <div className='tasks'>
                {header ? <TaskHeader headerState={[header, setHeader]} loadedState={[loaded, setLoaded]} />
                    : <CreateTask headerState={[header, setHeader]} loadedState={[loaded, setLoaded]} />}
                <ul>
                    {tasks.map((task, index) => {
                        return <li key={index} onClick={e => onClickHandler(task._id)}>{task.task}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export { Tasks }