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


function SignUpComponent () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  return (
    

      <div className = "grid grid-rows-4">
        <input className = "text-6xl border-8 rounded-md" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input className = "text-6xl border-8 rounded-md" type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <input className = "text-6xl border-8 rounded-md" type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <button className = "text-6xl text-left border-8 rounded-md">Create Account</button>
      </div>

      
    
  )
  
}



export default function SignUpSignIn () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')


  return (
    <>
      <Nav/>

      <div id = "signupsignin" className = "flex justify-evenly" style = {{height: "95vh"}}>
        <div id = "signup" className = "flex flex-col items-center justify-evenly border-8 p-8" style = {{margin: "auto"}}>


        <h1 className = "mb-7 text-7xl">Sign Up</h1>
        

            <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="confirm password"/>
            <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <button className = "my-8 text-4xl text-left border-4 rounded-md" onClick = {() => createUser(email, password, username)}>Create Account</button>
        



        </div>



        <div id = "log in" style = {{height: "100px", width: "100px", backgroundColor: "blue", margin: "auto"}}></div>
      </div>
      
    </>
  )
}


