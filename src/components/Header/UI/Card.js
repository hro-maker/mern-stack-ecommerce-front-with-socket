import React from 'react'
import './style.css'
import './card.scss'
/**
* @author
* @function Card
**/

const Card = (props) => {

  return(
    <div {...props} className="card">
      
      <div className="cardheader">
      {props.heaterLeft && <div>{props.heaterLeft}</div>}   
      {props.heaterRight && <div>{props.heaterRight}</div> }
            </div>
            <div className="card_bodyy">
            {props.children}
            </div>
        
    </div>
   )

 }

export default Card