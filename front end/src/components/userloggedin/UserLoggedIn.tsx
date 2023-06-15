import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { ref, onValue, DataSnapshot, getDatabase } from "firebase/database"
import { useEffect, useState } from "react"
import firebaseConfig from "../../firebaseConfig"
import "./userLoggedIn.css"

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)


function C(props: { signedIn: boolean; username: string; }) {
    if (props.signedIn) {
        return (
            <div className="user-logged-in">
                <p>Logged in as {props.username}</p>
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

export default function UserLoggedIn(): JSX.Element {
 
        // get the username of the user
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState("")


    useEffect (() => {
        const database = getDatabase(app)
        const auth = getAuth(app)
        onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('logged in')
            // signed in
            const uid = user.uid
            const userRef = ref(database, `users/${uid}/username`)
            onValue(userRef, (snapshot: DataSnapshot) => {
                setLoggedIn(true)
                setUsername(snapshot.val())
            })
        }
        else {
            console.log('not logged in')
            // not signed in
            setLoggedIn(false)
        }
        })
    }, [])

    return (
        <C signedIn = {loggedIn} username = {username}/>
    )

}