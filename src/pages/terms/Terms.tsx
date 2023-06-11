import { useEffect, useState } from "react"
import Nav from "../../components/nav/Nav"
//import termsList from "./../../utilities/termsList"
import $ from "jquery"
import "./terms.css"


const termsList = [
    {
      name: "Term1",
      definition: "This is the definition of term 1",
      related: ["Term2", "Term3"]
    },
    {
      name: "Term2",
      definition: "This is the definition of term 2",
      related: ["Term1", "Term 3"]
    },
    {
      name: "Term3",
      definition: "This is the definition of term 3",
      related: ["Term1", "Term2"]
    }
  ];
  
  function TermsContent(props) {
    const currentTerm = props.currentTerm;
    return (
      <>
        <div>{currentTerm.name}</div>
        <div>{currentTerm.definition}</div>
        <div>
          {"Related: " +
            currentTerm.related.reduce((acc, curr) => acc + curr + ", ")}
        </div>
      </>
    );
  }
  
export default function Terms() {
    const [currentTerm, setCurrentTerm] = useState(termsList[0]);
  
    function TermName(props) {
      return (
        <div
          className="term-name"
          onClick={() => {
            alert("clicked");
            setCurrentTerm(props.term);
          }}
        >
          {props.term.name}
        </div>
      );
    }
  
    return (
      <>
       
        <div id="terms-container">
          <div id="terms-bar">
            {termsList.map((term) => (
              <TermName term={term} key={term.name} />
            ))}
          </div>
          <div id="terms-content">
            <TermsContent currentTerm={currentTerm} />
          </div>
        </div>
      </>
    );
  }