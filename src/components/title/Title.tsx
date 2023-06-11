import { useEffect } from "react"
import "./title.css"
import $ from "jquery"

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
        <h1 id = "title">Habit Stack</h1>
    
      )
}