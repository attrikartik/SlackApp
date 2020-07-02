import React, { Component }  from 'react'
import Chat from '../Components/Chat'
import LoginForm from '../Components/LoginForm'
import OpenSocket from 'socket.io-client'
import { USER_CONNECTED, LOGOUT, GET_CONNECTED_USERS} from '../Events/Events'
const SOCKET_URL = 'http://localhost:4000'

class ChatContainer extends Component{

    state={
        messages:[
            {
                msg: 'Hello kartik'
            },
            {
                msg: 'How are you?'
            }
        ],
        socket: null,
        user: null,
        connectedUsers:[]
    }

    componentDidMount(){
        console.log('component mounted')
        this.initSocket()
    }
    
    initSocket = () => {
        const socket = OpenSocket(SOCKET_URL)
        socket.on('connect',()=>{
            console.log('connected')
        })
        this.setState({socket: socket},()=>console.log('socket inialized'))
    }

    messageSendHandler = text => {
       let messages =  [...this.state.messages]
        const newMsg = {
            msg: text
        }
       messages.push(newMsg)
       this.setState({messages: messages})
    }
    
    setUser = (user) => {
        const {socket} = this.state
        socket.emit(USER_CONNECTED, user, this.setUsers)
           this.setState({user: user})
    }
    setUsers = users => {
        this.setState({ connectedUsers: users})     
    }
    logout = () => {
        const { socket, user} = this.state
        socket.emit(LOGOUT, user, this.setUsers)
        this.setState({ user: null})
    }

    render(){
        const { user, messages, socket, connectedUsers} = this.state
        return(
            <div>
                {
                    !user ? <div>
                    <LoginForm socket={socket} setUser={this.setUser}/>
                    </div>
                    : <Chat 
                        messages={messages}
                        send={(text)=>{this.messageSendHandler(text)}}
                        socket={socket}
                        user={user}
                        logout={this.logout}
                        connectedUsers={connectedUsers}
                        />
                }
                
            </div>
        )
    }
}

export default ChatContainer