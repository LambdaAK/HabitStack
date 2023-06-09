import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import SignUpSignIn from "./SignUpSignIn"
import Terms from "./Terms"
import Dashboard from "./Dashboard"
import Social from "./Social"
import Settings from "./Settings"
import SignUp from "./SignUp"


export default function App() {
    return (
        <BrowserRouter>
            <Routes>

              <Route path="/" element={<Home/>} />
              <Route path="signin" element= {<SignUpSignIn/>}></Route>
              <Route path="signup" element= {<SignUp/>}></Route>
              <Route path="terms" element={<Terms/>}></Route>
              <Route path="dashboard" element={<Dashboard/>}></Route>
              <Route path="social" element={<Social/>}></Route>
              <Route path="settings" element={<Settings/>}></Route>
              
            </Routes>
          
          
          </BrowserRouter>
    )
}