import React, { useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Form = props => {

    const { mode, onSubmit, errorState } = props
    const [errors, setErrors] = errorState
    const navigate = useNavigate()
    const [user, updateUser] = useReducer(
        (user, updates) => ({ ...user, ...updates }),
        {
            userName: '',
            password: '',
            cPassword: ''
        }
    )
    const [error, updateError] = useReducer(
        (error, updates) => ({ ...error, ...updates }),
        {
            userReq: false,
            userLength: false,
            userUse: false,
            invalUser: false,
            passReq: false,
            passLength: false,
            passCon: false,
            invalPass: false
        }
    )

    useEffect(() => {
        if (errors.length > 0) {
            errors.map(error => {
                switch (error) {
                    case 'Username is required':
                        updateError({ userReq: true })
                        break
                    case 'Username must be 3 characters or longer.':
                        updateError({ userLength: true })
                        break
                    case 'Password is required':
                        updateError({ passReq: true })
                        break
                    case 'Username already in use.':
                        updateError({ userUse: true })
                        break
                    case 'Password is invalid.':
                        updateError({ invalPass: true })
                        break
                    case 'Username does not exist.':
                        updateError({ invalUser: true })
                        break
                    case 'Password must match confirm password':
                        updateError({ passCon: true })
                        break
                    case 'Password must be 5 characters or longer.':
                        updateError({ passLength: true })
                        break
                }
            })
            updateUser({ userName: '', password: '', cPassword: '' })
        }
    }, [errors])

    const handleChange = (key, value) => {
        let userCopy = user;
        userCopy[key] = value
        updateUser({ ...userCopy })
    }

    const handleSubmit = e => {
        e.preventDefault()
        Object.keys(error).forEach(key => updateError({
            userReq: false,
            userLength: false,
            userUse: false,
            invalUser: false,
            passReq: false,
            passLength: false,
            passCon: false,
            invalPass: false
        }))
        if (mode === 'register') {
            onSubmit(user)
            //navigate('/dashboard')
        } else {
            onSubmit(user)
            //navigate('/dashboard')
        }
    }


    return (
        <div className='login'>
            <form className='regForm' onSubmit={handleSubmit}>
                <label htmlFor="userName" >Username</label>
                <input type="text" name="userName" value={user.userName} placeholder={error.userReq ? 'Username is required.' : error.userLength ? 'Username length has to be greater than 3 characters.' :
                    error.userUse ? 'Username is already in use.' : error.invalUser ? "Username doesn't exist." : ''} onChange={e => handleChange('userName', e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={user.password} placeholder={error.passReq ? 'Password is required.' : error.passLength ? 'Password length has to be greater than 5 characters.' :
                    error.invalPass ? 'Wrong password.' : ''} onChange={e => handleChange('password', e.target.value)} />
                {mode === 'register' ?
                    <>
                        <label htmlFor="cPassword" >Confirm Password</label>
                        <input type="password" name="cPassword" value={user.cPassword} placeholder={error.passCon ? 'Password needs to match confirm password.' : ''} onChange={e => handleChange('cPassword', e.target.value)} />
                    </>
                    :
                    ''
                }
                <button type='submit'>{mode === 'register' ? 'Register' : 'Log In'}</button>
            </form>
        </div>
    )
}

export { Form }