import Nav from "../../components/nav/Nav"
import termsList from "./../../utilities/termsList"
import "./terms.css"

interface TermNameProps {
    name: string
}

function TermName (props: TermNameProps) {
    return (
        <div id = {"term-name-" + props.name} className = "term-name">
            {props.name}
        </div>
    )
}


const termNameComponents: JSX.Element[] = termsList.map(
    term => <TermName name = {term.name}/>
)



export default function Terms () {
    
    
    
    return (
        <>
            <Nav/>
            <div id = "terms-container">
                <div id = "terms-bar">
                    {
                        termNameComponents
                    }
                </div>
                <div id = "terms-content">
                    b
                </div>


            </div>
        </>
    )
}