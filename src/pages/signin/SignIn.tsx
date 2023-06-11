import { useEffect } from "react"
import Nav from "../../components/nav/Nav"
import "./signin.css"
import $ from "jquery"
import Title from "../../components/title/Title"
import logo from "../../assets/small-logo.png"

export default function SignIn () {


    useEffect(() => {
        $("#signup-button").click(function() {
            window.location.replace("/signup")
        })
    })


    return (
        <>
            <span className = "signin-box">
                <h1 className = "signin-box-header">Sign Up</h1>
                <img className = "signin-box-logo" src = {logo} alt = "logo"/>
                <hr className = "divider"/>
                <input className = "signin-box-input" type="text" placeholder="Email"></input>
                <input className = "signin-box-input" type="text" placeholder="Password"></input>
                <button id = "signin-box-button" className = "signin-box-button"
                // already have an account link
                
                
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