const {Server} = require('socket.io')
const express = require('express');
const firebaseConfig = require('./firebaseConfig');
const bodyParser = require('body-parser');


const { Auth, getAuth, signInWithEmailAndPassword } = require("firebase/auth")
const { Database, getDatabase, ref, onValue, get, set } = require("firebase/database")

const admin = require("firebase-admin");
const credentials = require("./credentials.json")

const appendToArrayLikeObject = require("./utilities/appendToArrayLikeObject")

const { verifyIdToken, userInServer, serverExists } = require("./utilities/verification")

const {v4} = require('uuid')
const generateUUID = v4

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://habit-tracker-5ecf3-default-rtdb.firebaseio.com/"
})

// firebase client
const firebase = require('firebase/app');
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = admin.database()


// socket stuff
const socketPort = 3001;
const io = new Server(socketPort)

io.on('connection', socket => handleSocketConnection(socket))

function handleSocketConnection(socket) {
    console.log("socket connected")
    socket.on('server messages', arg => handleSocketListenServerMessages(socket, arg))

}

async function handleSocketListenServerMessages(socket, arg) {
    console.log("listening for server messages")

    // get the user id
    const idToken = arg.idToken
    if (idToken == undefined) {
        socket.emit('error', {error: "No id token provided"})
        return
    }

    // verify the id token

    const t = await admin.auth().verifyIdToken(idToken)
    const uuid = t.uid


    if (uuid == "") {
        socket.emit('error', {error: "Invalid id token"})
        return
    }


    // get the server id
    const server = arg.server
    if (server == undefined) {
        socket.emit('error', {error: "No server provided"})
        return
    }
    const unsubscribe = onValue(ref(database, `servers/${server}/messages`), snapshot => {
        const messages = snapshot.val()
        socket.emit('event', messages)
    })

    // when the socket disconnects, unsubscribe from the onValue listener
    socket.on('disconnect', unsubscribe)

}



console.log(`Running socket server on port ${socketPort}`)
