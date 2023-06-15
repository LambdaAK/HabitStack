import { io } from "socket.io-client"

const socket = io("ws://192.168.1.10:3001")

socket.on("message", arg => {
    console.log(arg)
})

socket.emit("message", {a: "b"})

socket.on("a", arg => {
    console.log(arg)
})