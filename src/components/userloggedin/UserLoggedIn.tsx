import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { ref, onValue, DataSnapshot, getDatabase } from "firebase/database"
import { useState } from "react"
import firebaseConfig from "../../firebaseConfig"
import "./userLoggedIn.css"

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)


export default function UserLoggedIn(): JSX.Element {
 
        // get the username of the user
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // signed in
            const uid = user.uid
            const userRef = ref(database, `users/${uid}/username`)
            onValue(userRef, (snapshot: DataSnapshot) => {
                setLoggedIn(true)
                setUsername(snapshot.val())
            })
        }
    })

    if (loggedIn) {
        return (
            <div className="user-logged-in">
                <p>Logged in as {username}</p>
            </div>
        )
    }

    else {
        return (
            <div className="user-logged-in">
                <p>Not logged in</p>
            </div>
        )
    }

}