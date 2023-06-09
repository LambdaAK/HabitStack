import Nav from "./components/Nav"

export default function SignUpSignIn () {

    return (
        <>
        <Nav/>
            <div
            style = {{height: "15vh"}}
            ></div>
          <div className = "flex flex-col items-center"
          
          style = {{height: "80vh"}}>

           
                <div id = "sign-up-box" className = "text-5xl  text-center border-2 border-solid border-black rounded-md">
                    
                    <h1>Sign Up</h1>

                <div id = "sign-up-fields" className = "flex flex-col mt-10">
                    <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="email"/>
                    <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="password"/>
                    <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="confirm password"/>
                    <input className = "my-2 text-4xl border-4 rounded-md" type="text" placeholder="username"/>
                    <button className = "mt-8 text-4xl border-4 rounded-md">Sign Up</button>

                </div>
            </div>
    
                </div>
        </>
    )
  }