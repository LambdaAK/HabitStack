import { useEffect } from "react"
import Nav from "../../components/nav/Nav"
import "./signup.css"

import $ from "jquery"
import Title from "../../components/title/Title"
import logo from "../../assets/small-logo.png"

export default function SignUpSignIn () {

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
                <input className = "signup-box-input" type="text" placeholder="Username"></input>
                <input className = "signup-box-input" type="text" placeholder="Email"></input>
                <input className = "signup-box-input" type="text" placeholder="Password"></input>
                <input className = "signup-box-input" type="text" placeholder="Confirm Password"></input>
                <button id = "signup-box-button" className = "signup-box-button"
                // already have an account link
                
                
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