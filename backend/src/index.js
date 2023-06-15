const {Server} = require('socket.io')
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const expressPort = 3000;

// express stuff
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/', bodyParser.json(), (req, res) => {
    res.send(JSON.stringify({"user": "Alex"}))
    console.log(req.body)
});

app.listen(expressPort, () => {
    console.log(`Running express server on ${expressPort}`)
})

// socket stuff
const socketPort = 3001;
const io = new Server(socketPort)

io.on('connection', socket => {
    console.log("New connection")
    socket.emit("message", "Hello from server")

    socket.on('message', arg => {
        console.log(arg)
    })
    
})

setInterval(() => {
    io.emit("a", "aaaa")
}, 2000)

console.log(`Running socket server on port ${socketPort}`) 