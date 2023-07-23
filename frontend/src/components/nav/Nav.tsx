// nav bar for the website
// nav bar is a component that is used in all pages

import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import firebaseConfig from "../../firebaseConfig"

import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { DataSnapshot, getDatabase, onValue, ref } from "firebase/database"
import $ from "jquery"

import "./nav.css"
import navButton from "./../../assets/burger-menu-svgrepo-com.svg"

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
            <a onClick = {signOutUser} className="nav-link">Sign Out</a>
        )
    }

    else {
        return (
            <>
            <a href = "/signup" className="nav-link">Sign Up</a>
            <a href = "/signin" className="nav-link">Sign In</a>
            </>
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

    useEffect(() => {
        $('#nav-button').on('click', function() {
            if ($('#div-container').css('display') === 'none') {
                $('#div-container').css('display', 'flex')
            }
            else {
                $('#div-container').css('display', 'none')
            }
        })

        $(window).resize(function() {
            if (window.innerWidth <= 992) {
                console.log('aaaa')
                $('#div-container').css('display', 'none')
            }

            else if (window.innerWidth > 992) {
                $('#div-container').css('display', 'flex')
              
            }
        })

    }, [])

    return (
            <>
            <div style = {{height: "2vh"}}></div>
            
                <img id = "nav-button" src={navButton} alt="" />

            <div id = "div-container">
                <a href = "/" className="nav-link">Home</a>
                <SignInOrSignOutComponent signedIn = {signedIn}/>

                <div className = "nav-seperator"></div>
                <a href = "/habits" className="nav-link">Habits</a>
                <a href = "/social" className="nav-link">Social</a>
                <a href="/terms" className="nav-link">Terms</a>
                <div className = "nav-seperator"></div>
                <a href = "/settings" className="nav-link">Settings</a>
            </div>
            </>
      
    )
}