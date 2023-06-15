import { useEffect } from "react"
import Nav from "../../components/nav/Nav"
import "./signin.css"
import $ from "jquery"
import Title from "../../components/title/Title"
import logo from "../../assets/small-logo.png"
import { FirebaseApp, initializeApp } from "firebase/app"
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Database, getDatabase } from "firebase/database"
import firebaseConfig from "../../firebaseConfig"


const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app)
const auth: Auth = getAuth()

function signInProcedure() {
    // get the values of the inputs
    const email: string = $("#signin-box-email-input").val() as string
    const password: string = $("#signin-box-password-input").val() as string

    // sign in the user
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("Signed In")
        window.location.replace("/dashboard")
    })
    .catch((error: Error) => {
        alert(error.message)
    })
}


export default function SignIn () {


    useEffect(() => {
        $("#signup-button").click(function() {
            window.location.replace("/signup")
        })
    })


    return (
        <>
            <span className = "signin-box">
                <h1 className = "signin-box-header">Sign In</h1>
                <img className = "signin-box-logo" src = {logo} alt = "logo"/>
                <hr className = "divider"/>
                <input id = "signin-box-email-input" className = "signin-box-input" type="text" placeholder="Email"></input>
                <input id = "signin-box-password-input" className = "signin-box-input" type="text" placeholder="Password"></input>
                <button id = "signin-box-button" className = "signin-box-button"
                onClick = {signInProcedure}
                
                >Sign In</button>
                <hr className = "divider"/>
             
                <div className = "dont-have-account-container">
                    <div className = "dont-have-account-description">Don't have an account?</div>
                    <button id = "signup-button">Sign Up</button>
                </div>
            </span>
        </>
    )
}