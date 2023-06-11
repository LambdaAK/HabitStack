import { useEffect, useState } from "react"
import firebaseConfig from "../../firebaseConfig"
import Nav from "../../components/nav/Nav"
import "./signup.css"

import $ from "jquery"
import Title from "../../components/title/Title"
import logo from "../../assets/small-logo.png"
import { FirebaseApp, initializeApp } from "firebase/app"
import { Auth, UserCredential, createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { Database, getDatabase, ref, set } from "firebase/database"

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
}

function updatePasswordWarnings() {
    const password: string = $("#signup-password-input").val() as string
    const confirmPassword: string = $("#signup-confirm-password-input").val() as string

    if (password.length == 0 && confirmPassword.length == 0) {
        // both invisible
        $("#passwords-do-not-match").css("display", "none")
        $("#password-requirements").css("display", "none")
    }

    if (password != confirmPassword) {
        $("#passwords-do-not-match").css("display", "block")
        $("#password-requirements").css("display", "none")
    }
    else {
        $("#passwords-do-not-match").css("display", "none")
        if (password.length < 6) {
            $("#password-requirements").css("display", "block")
        }
        else {
            $("#password-requirements").css("display", "none")
        }
    }
}

async function signUpProcedure() {
    // get the values of the inputs
    const username: string = $("#signup-username-input").val() as string
    const email: string = $("#signup-email-input").val() as string
    const password: string = $("#signup-password-input").val() as string
    const confirmPassword: string = $("#signup-confirm-password-input").val() as string


    if (confirmPassword != password) {
        alert("Passwords do not match")
        return
    }

    if (password.length < 6) {
        alert("Password must have at least 6 characters")
        return
    }
    

    await createUser(email, password, username)
    // direct to the dashboard
    window.location.replace("/dashboard")

}



export default function SignUp () {


    useEffect(() => {
        $("#signin-button").click(function() {
            window.location.replace("/signin")
        })

    })

    return (
        <>
            <span className = "signup-box">
                <h1 className = "signup-box-header">Sign Up</h1>
                <img className = "signup-box-logo" src = {logo} alt = "logo"/>
                <hr className = "divider"/>
                <input id = "signup-username-input" className = "signup-box-input" type="text" placeholder="Username"></input>
                <input id = "signup-email-input" className = "signup-box-input" type="text" placeholder="Email"></input>
                <input id = "signup-password-input" className = "signup-box-input" 
                type="text" placeholder="Password" onChange = {updatePasswordWarnings}></input>
                <input id = "signup-confirm-password-input" className = "signup-box-input" 
                type="text" placeholder="Confirm Password" onChange = {updatePasswordWarnings}></input>
                
                <div id = "passwords-do-not-match">

                    Passwords do not match

                </div>

                <div id = "password-requirements">

                    Password must have at least 6 characters

                </div>
                
                <button id = "signup-box-button" className = "signup-box-button"
                    onClick = {() => {
                        signUpProcedure()
                    }}
                
                
                >Sign Up</button>
                <hr className = "divider"/>
                <div className = "already-have-account-container">
                    <div className = "already-have-account-description">Already have an account?</div>
                    <button id = "signin-button">Sign In</button>
                </div>
            </span>
        </>
    )
  }