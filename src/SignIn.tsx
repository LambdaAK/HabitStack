import { useState } from 'react'

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { Auth, UserCredential, onAuthStateChanged } from 'firebase/auth';
import { Database } from 'firebase/database';
import { FirebaseApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';



// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app)
const auth: Auth = getAuth()


// sign in user
function signInUser(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        // Signed in
        
        alert(`Signed in with email ${userCredential.user.email}`)
        window.location.replace("/");
      })
      .catch((error: Error) => {
        alert (error.message)
    
    })
}

export default function SignIn () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    return (
        <>
            <h1>habit tracker</h1>
            <h2>Sign In</h2>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)}></input>
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={(e) => {e.preventDefault(); signInUser(email, password)}}>Sign In</button>

        </>
    )
}