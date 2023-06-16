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


// express stuff
const expressApp = express()
const expressPort = 3000

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function handleMessageSend(req, res) {
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    const message = req.body.message
    if (message == undefined) {
        res.status(400).send(JSON.stringify({"error": "No message provided"}))
        return
    }

    if (message == "") {
        res.status(400).send(JSON.stringify({"error": "Empty message"}))
        return
    }

    // get the server
    const serverId = req.body.server
    if (serverId == undefined) {
        res.status(400).send(JSON.stringify({"error": "No server provided"}))
        return
    }

    // check that the server exists
    if (!await serverExists(database, serverId, res)) {
        return
    }

    // need to check if the user is in the server
    // get the user's servers
    if (!await userInServer(database, uuid, serverId, res)) {
        return
    }
    

    // send the message to the database

    const messageRef = ref(database, `servers/${serverId}/messages`)
    const messageSnapshot = await get(messageRef)
    const messages = messageSnapshot.val()
    if (messages == undefined) {
        // no messages yet
        const newMessageRef = ref(database, `servers/${serverId}/messages/0`)
        // set the message
        await set(newMessageRef, {
            "author": uuid,
            "content": message
        })
        res.status(200).send(JSON.stringify({"message": "Message sent"}))
        return

    }

    // append the message to the server
    const newMessages = appendToArrayLikeObject(messages, {
        "content": message,
        "author": uuid,
    })

    // send the new object back to the database

    await set(messageRef, newMessages)

    res.status(200).send(JSON.stringify({"message": "Message sent"}))
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function handleServerCreate(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }

    // get the server name
    const serverName = req.body.name
    if (serverName == undefined) {
        res.status(400).send(JSON.stringify({"error": "No server name provided"}))
        return
    }

    // make a server id
    const serverId = generateUUID() // CHANGE THIS LATER
    // create the server
    
    const newServerRef = ref(database, `servers/${serverId}`)
    await set(newServerRef, {
        "name": serverName,
        "owner": uuid,
    })

    // then, add the server to the user's servers
    const userServersRef = ref(database, `users/${uuid}/servers`)
    const userServersSnapshot = await get(userServersRef)
    const userServers = userServersSnapshot.val()
    if (userServers == undefined) {
        res.status(400).send(JSON.stringify({"error": "User does not exist"}))
        return
    }

    await set(userServersRef, appendToArrayLikeObject(userServers, serverId))

    res.status(200).send(JSON.stringify({"message": "Server created", "serverId": serverId}))
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function handleUserNameChange(req, res) {
    // verify the id token
    const uuid = await verifyIdToken(admin, req, res)
    if (uuid == "") {
        res.status(401).send(JSON.stringify({"error": "Invalid id token"}))
        return
    }
    // get the new name
    const newName = req.body.name
    if (newName == undefined) {
        res.status(400).send(JSON.stringify({"error": "No new name provided"}))
        return
    }
    // set the new name
    const userRef = ref(database, `users/${uuid}`)
    await set(userRef, {
        "name": newName
    })

    res.status(200).send(JSON.stringify({"message": "Name changed"}))
}

expressApp.post("/message/send", bodyParser.json(), (req, res) => {
    handleMessageSend(req, res)
})

expressApp.post("/server/create", bodyParser.json(), (req, res) => {
    handleServerCreate(req, res)
})

expressApp.post("/user/name/change", bodyParser.json(), (req, res) => {
    handleUserNameChange(req, res)
})

expressApp.listen(expressPort, () => {
    console.log(`Running express server on port ${expressPort}`)
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

console.log(`Running socket server on port ${socketPort}`)

/**
 * [test (email, password)] logs into the firebase auth system and obtains the id token of the user.
 * Then, it uses the admin sdk to verify the id token and obtain the user's uuid. 
 * @param {string} email 
 * @param {string} password 
 */
async function test(email, password) {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredentials.user.getIdToken(true);
    const decodedUser = await admin.auth().verifyIdToken(idToken)
    const uuid = decodedUser.uid;
    console.log(uuid)
}
