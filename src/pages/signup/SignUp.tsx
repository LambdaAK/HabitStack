import { useEffect } from "react"
import Nav from "../../components/nav/Nav"
import "./signup.css"

export default function SignUpSignIn () {

    return (
        <>
        <Nav/>
            <span className = "signup-box">
                <h1 className = "signup-box-header">Sign Up</h1>
                <div className = "signup-description">
                    To sign up, select a username and provide a valid email address. Then, create a secure password.
                    Click the Sign Up button to proceed.
                </div>
                <input className = "signup-box-input" type="text" placeholder="Username"></input>
                <input className = "signup-box-input" type="text" placeholder="Email"></input>
                <input className = "signup-box-input" type="text" placeholder="Password"></input>
                <input className = "signup-box-input" type="text" placeholder="Confirm Password"></input>
                <button id = "signup-box-button" className = "signup-box-button"
                
                
                >Sign Up</button>
            </span>
        </>
    )
  }