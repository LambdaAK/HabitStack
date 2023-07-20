import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home"
import SignUpSignIn from "../SignUpSignIn"
import Terms from "../pages/terms/Terms"
import Habits from "../pages/Habits/Habits"
import Social from "../pages/social/Social"
import Settings from "../pages/settings/Settings"
import SignUp from "../pages/signup/SignUp"
import SignIn from "../pages/signin/SignIn"
import Nav from "../components/nav/Nav"
import UserLoggedIn from "../components/userloggedin/UserLoggedIn"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseConfig from "../firebaseConfig"
import { useEffect } from "react"

const auth = getAuth()

function setCookie(name: string, value: string, days: number) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";

}

function getCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export default function App() {


    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // user is signed in
          // store the uuid in the cookies

          setCookie("user", user.uid, 30)
          
        }

        else {
          setCookie("user", "", 0)
        }

      })

    })


    return (
        <>
        <UserLoggedIn/>
        <Nav />
        <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="signin" element={<SignIn />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="terms" element={<Terms />}></Route>
          <Route path="habits" element={<Habits />}></Route>
          <Route path="social" element={<Social />}></Route>
          <Route path="settings" element={<Settings />}></Route>

        </Routes>


      </BrowserRouter>
      </>
    )
}