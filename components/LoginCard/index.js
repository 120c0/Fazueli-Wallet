import styles from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword, setAmount } from '../../redux/user/slice'
import { useState } from 'react'
import Link from 'next/link'

export const LoginCard = () => {
    const [username, setUsernameField] = useState('')
    const [password, setPasswordField] = useState('')

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()


    const execute_login = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json()
        if(response.status === 200) {
            dispatch(setUsername(username))
            dispatch(setPassword(password))
            dispatch(setAmount(data.BALANCE))
        } else {
            alert('Error: Username or Password are invalid')
        }
        
    }
    
    return (
        <div className={styles.container}>
            <h1>Login</h1>

            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsernameField(e.target.value)}/>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPasswordField(e.target.value)}/>

            <button onClick={() => execute_login()}>Sign In</button>

            <Link href={'/register'}>Create Account</Link>
        </div>
    )
}