
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { useEffect, useState } from "react";
import { User, UserCredential, signOut } from "firebase/auth";
import { Database, onValue, ref, set } from "firebase/database";
import firebase from "firebase/compat/app";
import firebaseConfig from "./firebaseConfig";



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth()



// log out function
function logOut() {
    signOut(auth).then(() => {
        // Sign-out successful.
        alert("Signed Out")
        window.location.replace("/");
      }).catch((error) => {
        // An error happened.
        alert(error.message)
      })
}

export default function Home() {

    const [em, setEm] = useState('no user logged in')
    const [username, setUsername] = useState('no user logged in')


    useEffect(() => {
    auth.onAuthStateChanged((user: User) => {
        if (user) {
            // User is signed in.
            setEm(user.email)
         
            // get the username from the database
            const r = ref(getDatabase(), 'users/' + user.uid)
            onValue(r, (snapshot) => {
                const data = snapshot.val()
                //print the data in the console
                console.log(data)
                setUsername(data.username)
            })

        } else {
          // User is signed out.

        }
      });

    }, [])
  

    return (
        <>
            <h1 className="text-3xl font-bold underline">habit tracker</h1>
            <h2>Home</h2>
            <h3>{em}</h3>
            <h3>{username}</h3>
            <button onClick={logOut}>Log Out</button>
        </>
    )
}