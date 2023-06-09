import { useEffect, useState } from 'react'
import Nav from "./components/Nav";
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


export default function SignUpSignIn () {

  return (
    <>
      <Nav/>

      <div id = "signupsignin" className = "flex flex-row justify-evenly items-start" style = {{height: "95vh"}}>
        <div className = "border-2 border-red-500 rounded-md flex flex-col">
          <h1 className = "te">
            Sign Up
          </h1>

          <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="email"/>
          <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="password"/>
          <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="confirm password"/>
          <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="username"/>

        </div>

        <div className = "border-2 border-red-500 rounded-md flex flex-col">
          <h1 className = "">
            Sign In
          </h1>

          <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="email"/>
          <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="password"/>


        </div>

        
      </div>
      
    </>
  )
}


