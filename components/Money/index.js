import styles from './style.module.scss'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAmount, setPassword, setUsername } from '../../redux/user/slice';

export const Money = () => {
    const [username_view, setUsernameV] = useState('Anonymous')
    const [amount, setAmountV] = useState(0)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setUsernameV(user.username == null ? 'Anonymous' : user.username)
        setAmountV(user.amount)
    }, [user])

    const logout = () => { 
        dispatch(setUsername(null))
        dispatch(setPassword(null))
        dispatch(setAmount(0))
    }

    return (
        <div className={styles.container}>
            <span className={styles.exit} onClick={() => logout()}>X</span>
            <h1 className={styles.username}>{ username_view }</h1>
            <span className={styles.money_text_code}>FZL</span>
            <span className={styles.amount}>{ amount.toFixed(2) }</span>
            <span className={styles.valori}>R$ {Number(amount * (10 / 399000000000)).toFixed(15)}</span>
        </div>
    )
}
