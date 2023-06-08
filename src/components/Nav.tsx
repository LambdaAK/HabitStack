// nav bar for the website
// nav bar is a component that is used in all pages

import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import firebaseConfig from "../firebaseConfig"

import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { DataSnapshot, getDatabase, onValue, ref } from "firebase/database"

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
            <a onClick = {signOutUser}className="mx-20 col-span-1 text-3xl font-bold underline">Sign Out</a>
        )
    }

    else {
        return (
            <a href = "/signin" className="mx-20 col-span-1 text-3xl font-bold underline">Sign In</a>
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
        <div className = "flex justify-center items-center mt-10">
            <div className = "grid grid-cols-9">
                <SignInOrSignOutComponent signedIn = {signedIn}/>
                <div className = "col-span-2"></div>
                <a href = "/" className="mx-20 col-span-1 text-3xl font-bold underline">Home</a>
                 <a href = "/dashboard" className="mx-20 col-span-1 text-3xl font-bold underline">Dashboard</a>
                <a href = "/social" className="mx-20 first-line:col-span-1 text-3xl font-bold underline">Social</a>
                <div className = "col-span-2"></div>
                <a href = "/settings" className="mx-20 col-span-1 text-3xl font-bold underline">Settings</a>
            </div>
        </div>
    )
}