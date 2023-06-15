const {Server} = require('socket.io')
const express = require('express');
const firebaseConfig = require('./firebaseConfig');
const bodyParser = require('body-parser');


const { Auth, getAuth, signInWithEmailAndPassword } = require("firebase/auth")
const { Database, getDatabase, ref, onValue } = require("firebase/database")

const admin = require("firebase-admin");
const credentials = require("./credentials.json")

admin.initializeApp({
    credential: admin.credential.cert(credentials),
})

// firebase client
const firebase = require('firebase/app');
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);



// express stuff
const expressApp = express()
const expressPort = 3000
expressApp.get('/', (req, res) => {
    res.send('Hello World!');
})

expressApp.post('/', bodyParser.json(), (req, res) => {
    res.send(JSON.stringify({"user": "Alex"}))
    console.log(req.body)
});

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
