let io;

module.exports = {
    init: httpServer =>{
        io = require('socket.io')(httpServer)
        return io
    },

    getIo: ()=>{
        if(!io){
            console.log('Socket IO error')
        }
        return io
    }
}