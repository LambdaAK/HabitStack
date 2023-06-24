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

    fetch('http://192.168.1.10:3000/user/username/change', {
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

async function testDeleteServerInvite(email, password, serverId, invite) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/server/invite/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken
        },
        body: JSON.stringify({
            "server": serverId,
            "invite": invite
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

async function testJoinServer(email, password, invite) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/server/join', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken
        },
        body: JSON.stringify({
            "invite": invite
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

async function testChangeServerName(email, password, server, name) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/server/name/change', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken
        },
        body: JSON.stringify({
            "name": name,
            "server": server
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}


async function testListenServerMessages(email, password, server) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    const socket = io("ws://192.168.1.10:3001")

    const expressPort = 3000
    const socketPort = 3001

    socket.on("connect", () => {
        console.log("Connected to socket server")
        socket.emit("server messages", {
            "server": server,
            "idToken": idToken,
        })
        socket.on("event", arg => {
            console.log("new message")
        })
    })

    setInterval(() => {
        // send a message
        fetch('http://192.168.1.10:3000/message/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'id-token': idToken
            },
            body: JSON.stringify({
                "server": server,
                "message": "Hello"
            })
        }).then(res => {console.log("message sent")})
    }, 2000)

}

async function testHabitCreate(email, password, name, iWill, atTime, atLocation, obvious, attractive, easy, satisfying) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/habit/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken
        },
        body: JSON.stringify({
            "name": name,
            "iWill": iWill,
            "atTime": atTime,
            "atLocation": atLocation,
            "obvious": obvious,
            "attractive": attractive,
            "easy": easy,
            "satisfying": satisfying,
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

async function testHabitDelete(email, password, name) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/habit/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken,
        },
        body: JSON.stringify({
            "name": name,
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

async function testHabitResistCreate(email, password, name, invisible, unattractive, difficult, unsatisfying) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/habitresist/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken,
        },
        body: JSON.stringify({
            "name": name,
            "invisible": invisible,
            "unattractive": unattractive,
            "difficult": difficult,
            "unsatisfying": unsatisfying,
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

async function testHabitResistDelete(email, password, name) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/habitresist/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken,
        },
        body: JSON.stringify({
            "name": name,
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

async function testTasksAdd(email, password, name, year, month, day) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/tasks/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken,
        },
        body: JSON.stringify({
            "name": name,
            "year": year,
            "month": month,
            "day": day,
        })   
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}

async function testTasksDelete(email, password, index, year, month, day) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)

    fetch('http://192.168.1.10:3000/tasks/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken,
        },
        body: JSON.stringify({
            "index": index,
            "year": year,
            "month": month,
            "day": day,
        })
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json)
        })
    })
}
    