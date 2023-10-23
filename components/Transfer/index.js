import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setAmount } from '../../redux/user/slice'

export const Transfer = () => {
    const [reciver_username, setReciverUsername] = useState()
    const [amount, setAmountView] = useState(0)
    const setAmountSec = (val) => {
        if(String(amount).length > 12)
            setAmountView(999999999999)
        else 
            setAmountView(val)
    }
    
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    const pay = async () => {
        if(amount <= 0 || user.username === reciver_username) {
            alert('Ocorreu um erro nas infomrações')
        } else {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender_password: user.password, 
                    sender_username: user.username, 
                    reciver_username: reciver_username, 
                    amount: (amount * 0.029).toFixed(2)
                })
            })
            
            const data = await response.json()
            if(data.success) {
                alert(`Enviado com sucesso`)
                dispatch(setAmount(user.amount - amount));
            } else {
                alert('Ocorreu um erro nas infomrações')
            }
        }
    }
    
    return (
        <div className={styles.container}>
            <input placeholder='Username' type='text' value={reciver_username} onChange={(e) => setReciverUsername(e.target.value)}/>
            <input placeholder='Amount' type='number' value={amount} onChange={(e) => setAmountSec(e.target.value)}/>
            <span>Tax: {(amount * 0.029).toFixed(2)} | Real Value: {(amount - amount * 0.029).toFixed(2)}</span>
            <button onClick={() => pay()}>Pay</button>
        </div>
    )
}