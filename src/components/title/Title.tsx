import { useEffect } from "react"
import "./title.css"
import $ from "jquery"
import logo from "./../../assets/logo.png"

interface TitleProps {
  animate: boolean
}

export default function Title (props: TitleProps) {
  
  useEffect(() => {
    if (props.animate) {
      $("#title").addClass("animate-title")
    }
  })
  
  return (
          <div id = "title">
            <img src = {logo} alt = "logo" 
            style = {{height: "300px"}}
            />
          </div>
      )
}