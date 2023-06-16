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

async function main(email, password) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await user.user.getIdToken(true)
    
    const serverToSendTo = "67890"
    const messageContent = "a"

    fetch('http://192.168.1.10:3000/message/send',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'id-token': idToken
        },
        body: JSON.stringify({
            "server": serverToSendTo,
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

main()
