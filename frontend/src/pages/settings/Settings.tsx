import Nav from "../../components/nav/Nav";
import "./settings.css"
import logo from "../../assets/small-logo.png"
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { Database, getDatabase, ref, set, update } from "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import { useEffect } from "react";
import $ from "jquery"
import { changeUsernameAPI } from "../../utilities/backendRequests";




const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app)
const auth: Auth = getAuth()


async function sendEmailForResettingPassword() {
    if (auth.currentUser == null) return;
    const email: string = auth.currentUser.email as string
    
    try {
        await sendPasswordResetEmail(auth, email)
        alert("Email sent to " + email + " with instructions on how to reset your password.")
    }
    catch {
        alert("An error occured trying to send a password reset email. Please try again later.")
    }
}

async function changeUserName() {
    if (auth.currentUser == null) return;
    const newUsername: string = $("#change-username-input").val() as string
    
    const result = await changeUsernameAPI(auth, newUsername)
    if (result.success) {
        alert("Username changed successfully")
        // clear the input field
        $("#change-username-input").val("")
    }
    else {
        alert(result.errorMessage)
    }
}


export default function settings () {
    
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // logged in
                // make the settings box visible
                $("#settings-box").css("display", "flex")
                $("#not-logged-in").css("display", "none")

            }
            else {
                // not logged in
                // make the settings box invisible
                $("#settings-box").css("display", "none")
                $("#not-logged-in").css("display", "flex")

            }
        })
    }, [])

    
    
    
    return (
        <>

            <div id = "not-logged-in">
                Log in to access account settings
            </div>
            <div id = "settings-box">
                <div className = "settings-box-header">
                    Settings
                </div>
                <img className = "signup-box-logo" src = {logo} alt = "logo"/>
                <hr className = "divider"/>
                <div className = "reset-password-button" onClick = {sendEmailForResettingPassword}>
                    Reset Password
                </div>
                <hr className = "divider"/>
                <div className = "button-input-pair">
                    <div className = "change-username-button" onClick = {changeUserName}>
                        Change Username
                    </div>
                    <input id = "change-username-input" className = "change-username-input" placeholder = "new username">

                    </input>
                </div>
                

            </div>
        </>
    )
}