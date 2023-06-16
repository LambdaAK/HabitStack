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
        res.status(400).send(JSON.stringify({"error": "Server does not exist"}))
        return
    }

    // append the message to the server
    const newMessages = appendToArrayLikeObject(messages, {
        "message": message,
        "author": uuid,
    })

    // send the new object back to the database

    await set(messageRef, newMessages)

    res.status(200).send(JSON.stringify({"message": "Message sent"}))
}

expressApp.post('/message/send', bodyParser.json(), (req, res) => handleMessageSend(req, res))

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
