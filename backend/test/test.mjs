import { io } from "socket.io-client"
import fetch from "node-fetch"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, onValue } from "firebase/database"
import * as firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyClwnko3Y0Ewb2VtxPYjL9EWUbymgb_Xmo",
    authDomain: "habit-tracker-5ecf3.firebaseapp.com",
    databaseURL: "https://habit-tracker-5ecf3-default-rtdb.firebaseio.com",
    projectId: "habit-tracker-5ecf3",
    storageBucket: "habit-tracker-5ecf3.appspot.com",
    messagingSenderId: "52991130855",
    appId: "1:52991130855:web:678b6cf5bb25bbd69b3642",
    measurementId: "G-G8RP1D6E1Q"
}

/*
const socket = io("ws://192.168.1.10:3001")

const expressPort = 3000
const socketPort = 3001


socket.on("message", arg => {
    console.log(arg)
})

socket.emit("message", {a: "b"})
*/

/*
fetch('http://192.168.1.10:3000/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'id-token': '12345'
    },
    body: JSON.stringify({"user": "Alex"})
})
*/
const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth()
const database = getDatabase(app)

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {string} serverId 
 * @param {string[]} messages 
 */
async function testSendMessage(email, password, serverId, messageContent) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)
    

    fetch('http://192.168.1.10:3000/message/send',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken
        },
        body: JSON.stringify({
            "server": serverId,
            "message": messageContent
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

async function testCreateServer(email, password, name) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/server/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken
        },
        body: JSON.stringify({
            "name": name
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {string} name 
 */
async function testUserNameChange(email, password, name) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/user/name/change', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken
        },
        body: JSON.stringify({
            "name": name
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

async function testCreateServerInvite(email, password, serverId) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/server/invite/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken
        },
        body: JSON.stringify({
            "server": serverId
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}