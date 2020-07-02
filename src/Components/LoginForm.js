import React, {useState} from 'react'
import Input from './UI/Input'
import {VERIFY_USER, GET_CONNECTED_USERS} from '../Events/Events'

const LoginForm = props =>{

    const [userName, setUserName] = useState('')
    const [error, setError] = useState('')
    const handlInput = e => {
        setUserName(e.target.value)
    }

    const handleSubmit = e =>{
        e.preventDefault()
        const {socket} = props
        socket.emit(VERIFY_USER, userName, setUser)
        setUserName('')
    }

    const setUser = async  ({user, isUser}) => {
        if(isUser){
            setError('Username Already Taken')
        }else{
            const {socket} = props
            // socket.on(GET_CONNECTED_USERS, (connected) => {         
            //     props.setUser(user,connected)
            // })
            props.setUser(user)
        }
    }

    // const setUsers = (user,connected) => {
    //     props.setUser(user,connected)
    // }
    return (
        <form onSubmit={handleSubmit}>
            <h2>PLEASE LOGIN</h2>
          <div style={{width: '30%', display: 'inline-block', marginTop: '150px'}}>
            <Input placeholder='Username' change={handlInput} value={userName}/>
            { error && <p style={{color: 'red'}}> {error}</p>}
          </div>
        </form>
    )
} 
export default LoginForm