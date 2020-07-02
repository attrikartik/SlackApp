let app = require('http').createServer()

const io = require('./socketIo').init(app)

const SocketManager = require('./SocketManager')

io.on('connection',SocketManager)

app.listen(4000,(err)=>{
    if(!err){
        console.log('connected to Port 4000')
    }
})