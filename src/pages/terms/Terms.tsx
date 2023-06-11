import { useEffect, useState } from "react"
import Nav from "../../components/nav/Nav"
//import termsList from "./../../utilities/termsList"
import $ from "jquery"
import "./terms.css"
import termsList from "../../utilities/termsList"
import term from "../../utilities/term"


function TermLink(props: {term: term, termSetter: Function}) {
    return (
        <div className = "term-link" onClick = {() => props.termSetter(props.term)}>
            {props.term.name}
        </div>
    )
}

function RelatedTermsList(props: {relatedTerms: string[], termSetter: Function}) {

  return (
      <>
      <div className = "related-terms-wrapper">
        <div className = "related-terms-header">
          Related Terms
      </div>
      <div className = "related-terms">
          {
          props.relatedTerms.map(term => {
              // find the term in the termsList
              
              let termObj = undefined;

              for (let i = 0; i < termsList.length; i++) {
                if (termsList[i].name == term) {
                  termObj = termsList[i];
                  break;
                }

              }
              
              if (termObj == undefined) {
                return (
                  <div>
                    Undefined Term
                  </div>
                )
              }

              return <TermLink term = {termObj} termSetter = {props.termSetter} key = {termObj.name}/>
            }
          ) 
          }
      </div>
      </div>
      
      </>
  )
}


function TermsContent(props: {currentTerm: term, termSetter: Function}) {
    const currentTerm = props.currentTerm;
    return (
      <>
        <div className = "terms-content">
          <div className = "term-header">
            {currentTerm.name}
          </div>
          <hr className = "term-divider"/>
          <div className = "term-definition">
            {`${currentTerm.definition}`}
          </div>

          <RelatedTermsList relatedTerms = {currentTerm.related} termSetter = {props.termSetter}/>
          
        </div>
      </>
    );
  }
  
export default function Terms() {

    const [currentTerm, setCurrentTerm] = useState(termsList[0]);
  
    function TermName(props: { term: term }) {
      return (
        <div
          className="term-name"
          onClick={() => {
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
            {termsList.map((term) => {
              return <TermName term={term} key={term.name} />
          })}
          </div>
    
          <TermsContent currentTerm={currentTerm} termSetter = {setCurrentTerm} />
      
        </div>
      </>
    );
  }