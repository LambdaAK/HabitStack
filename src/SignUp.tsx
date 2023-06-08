import { useEffect, useState } from 'react'

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
import { Auth, UserCredential, onAuthStateChanged } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { Database } from 'firebase/database';
import firebaseConfig from './firebaseConfig';



// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app)
const auth: Auth = getAuth()



async function createUser (email: string, password: string, username: string): Promise<void> {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user
  await set(ref(database, 'users/' + user.uid), {
    username: username
  })
  alert(`Signed in with email ${user.email}`)
  window.location.replace("/");
}


export default function SignUp () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')


  return (
    <>
      <h1>habit tracker</h1>
 
        <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <button onClick={(e) => {e.preventDefault(); 
        
        createUser(email, password, username)

        }}>Create Account</button>
      
    </>
  )
}


