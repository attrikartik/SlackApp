import React, { Component }  from 'react'
import Input from './UI/Input'
import Button from './UI/Button'
class Message extends Component{

    state = {
        currentMsg: ''
    }

    currentMsgHandler = (e) =>{
        this.setState({ currentMsg: e.target.value})
    }
    sendMessagehandler = (e) => {
        const text = this.state.currentMsg
        if(text !==''){
            this.setState({currentMsg: ''})
            this.props.sendMessage(text)
        }
    }
    render(){
        return(
            <div>
            <Input change={this.currentMsgHandler} value={this.state.currentMsg}/>
            <Button click={this.sendMessagehandler} title="Send" color= '#0CA761'/>
            </div>
        )
    }
}

export default Message