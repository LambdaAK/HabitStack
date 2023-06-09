import { useEffect } from "react"
import Nav from "./components/Nav"
import "./signup.css"

export default function SignUpSignIn () {


    useEffect(() => {
        const signupBoxButton = document.getElementById("signup-box-button")
        signupBoxButton?.addEventListener("mouseover", () => {
            signupBoxButton.classList.remove("signup-box-button-no-hover")
            signupBoxButton.classList.add("signup-box-button-hover")
        })
        signupBoxButton?.addEventListener("mouseout", () => {
            signupBoxButton.classList.remove("signup-box-button-hover")
            signupBoxButton.classList.add("signup-box-button-no-hover")
        })

        const inputs = document.getElementsByClassName("signup-box-input")
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("focus", () => {
               
                inputs[i].classList.remove("signup-box-input-not-selected")
                inputs[i].classList.add("signup-box-input-selected")
            })
            inputs[i].addEventListener("blur", () => {
                inputs[i].classList.remove("signup-box-input-selected")
                inputs[i].classList.add("signup-box-input-not-selected")
            })

         
        }
    })

    return (
        <>
        <Nav/>
            <span className = "signup-box">
                <h1 className = "signup-box-header text-6xl">Sign Up</h1>
                <div className = "signup-description text-2xl">
                    To sign up, select a username and provide a valid email address. Then, create a secure password.
                    Click the Sign Up button to proceed.
                </div>
                <input className = "signup-box-input" type="text" placeholder="Username"></input>
                <input className = "signup-box-input" type="text" placeholder="Email"></input>
                <input className = "signup-box-input" type="text" placeholder="Password"></input>
                <input className = "signup-box-input" type="text" placeholder="Confirm Password"></input>
                <button id = "signup-box-button" className = "signup-box-button text-4xl"
                
                
                >Sign Up</button>
            </span>
        </>
    )
  }