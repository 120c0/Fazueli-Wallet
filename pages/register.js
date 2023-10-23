import { use, useState } from 'react'
import { Layout } from '../components/Layout'
import styles from '../styles/Register.module.scss'
import Link from 'next/link'

export default function Home() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const create_account_and_return = async () => {
    if(username != undefined && password != undefined) {
      if(username.length > 5 && password.length > 7) {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        const data = await response.json()
        
        if(data.success) {
          alert('Successfully')
        } else {
          alert('Error ' + data.error)
        }
      } else {
        alert('Error: Username or Password is not valid to register')
      }
    } else {
      alert('Error: Username or Password is not valid to register')
    }
  }
  
  return (
    <Layout>
        <div className={styles.container}>
          <h1>Fazu<span>eli</span> Wallet</h1>
          <footer>Create Your Own Wallet</footer>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Username'/>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'/>

          <button onClick={() => create_account_and_return()}>Sign Up</button>
          <Link href={'/'}>Back to Login</Link>
        </div>
    </Layout>
  )
}
