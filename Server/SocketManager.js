const { VERIFY_USER, USER_CONNECTED, LOGOUT, GET_CONNECTED_USERS } = require('./Events/Events')
const  { createUser} = require('./Utility/index')

let connectedUsers = {}

module.exports = (socket) => {
    console.log('socket connected, socket id' + socket.id)

    socket.on(VERIFY_USER, (userName, callback) => {
        if(isUser(connectedUsers, userName)){
          callback({user: null, isUser: true})
        }else{
            callback({user: createUser({name: userName}), isUser: false,})
        }   
    })
    
    socket.on(USER_CONNECTED, (user, callback)=>{
        connectedUsers = addUser(connectedUsers, user)
        let users = []
        for( let u in  connectedUsers){
            if(u !== user.name){
                users.push(u)
            }
        }

        // socket.emit(GET_CONNECTED_USERS, users)
        callback(users)
        socket.user = user
    })
    
    // socket.on(GET_CONNECTED_USERS, (callback) => {
    //     console.log('hello')
    //     callback(connectedUsers)
    // })
    socket.on(LOGOUT, (user, callback) => {
        removeUser(connectedUsers, user.name)
        let users = []
        for( let u in  connectedUsers){
            if(u !== user.name){
                users.push(u)
            }
        }
        callback(users)
    })
}

const isUser = ( userList, userName) => {
    return userName in userList
}

const addUser = (userList, user) => {
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return  connectedUsers = newList
}


const removeUser = (userList, userName) => {
    let newList = Object.assign({}, userList)
    delete  newList[userName]
    return connectedUsers = newList
}