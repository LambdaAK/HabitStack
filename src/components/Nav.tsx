// nav bar for the website
// nav bar is a component that is used in all pages

import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import firebaseConfig from "../firebaseConfig"

import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { DataSnapshot, getDatabase, onValue, ref } from "firebase/database"

import "./nav.css"

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)


function signOutUser () {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // signed in
            signOut(auth).then(() => {
                // Sign-out successful.
                alert("Signed Out")
                window.location.replace("/");
            })
        } 
    })
}

interface SignInOrSignOutProps {
    signedIn: boolean
}

function SignInOrSignOutComponent (props: SignInOrSignOutProps) {

    if (props.signedIn) {
        return (
            <a onClick = {signOutUser}className="nav-link mx-20 col-span-1 text-3xl font-bold">Sign Out</a>
        )
    }

    else {
        return (
            <a href = "/signin" className="nav-link mx-20 col-span-1 text-3xl font-bold">Sign In</a>
        )
    }
}


export default function Nav() {

    const [signedIn, setSignedIn] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // signed in
            setSignedIn(true)
        } 
        
        else {
            setSignedIn(false)
        }
    })


    return (
            <>
            <div style = {{height: "2vh"}}></div>
            <div className = "grid grid-cols-9"
            
            style = {{height: "3vh"}}
            >
                <SignInOrSignOutComponent signedIn = {signedIn}/>
                <div className = "col-span-2"></div>
                <a href = "/" className="nav-link mx-20 col-span-1 text-3xl font-bold">Home</a>
                 <a href = "/dashboard" className="nav-link mx-20 col-span-1 text-3xl font-bold">Dashboard</a>
                <a href = "/social" className="nav-link mx-20 first-line:col-span-1 text-3xl font-bold">Social</a>
                <div className = "col-span-2"></div>
                <a href = "/settings" className="nav-link mx-20 col-span-1 text-3xl font-bold">Settings</a>
            </div>
            </>
      
    )
}