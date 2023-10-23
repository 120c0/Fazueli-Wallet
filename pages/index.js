import { Layout } from '../components/Layout'
import { Money } from '../components/Money'
import { LoginCard } from '../components/LoginCard'

import { useSelector } from 'react-redux'
import { Transfer } from '../components/Transfer'

export default function Home() {
  const user = useSelector((state) => state.user)
  
  return (
    <Layout>
    {
      (user.username != null && user.password != null) ?
        <Money/> : <></>
    } {
      (user.username != null && user.password != null) ?
        <Transfer/> : <LoginCard/>
    }
    </Layout>
  )
}
