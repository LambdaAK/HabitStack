import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import SignUpSignIn from "../SignUpSignIn"
import Terms from "../pages/terms/Terms"
import Dashboard from "../pages/dashboard/dashboard"
import Social from "../pages/social/Social"
import Settings from "../pages/settings/Settings"
import SignUp from "../pages/signup/SignUp"


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