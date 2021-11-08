import React, { useState, useEffect } from 'react';
import {GoThumbsup, GoReport} from "react-icons/Go";
import axios from 'axios';
import "./Helpful.css";
export default function Helpful(props) {
  const [helpCount, setHelpCount]=useState(props.helpCount)
  function handleHelpful(){
    let serverUrl = `/reviews/${props.review_id}/helpful`
    axios.put(serverUrl).then(()=>{
      setHelpCount(helpCount+1);
      document.getElementById(`helpful${props.review_id}`).disabled=true;
      document.getElementById(`report${props.review_id}`).disabled=true;
    })
  }
  function handleReport(){
    let serverUrl = `/reviews/${props.review_id}/report`
    axios.put(serverUrl).then(()=>{
      document.getElementById(`report${props.review_id}`).disabled=true;
      document.getElementById(`helpful${props.review_id}`).disabled=true;
    })
  }
  return (
    <div className="helpfulContainer">
      <div>Helpful?</div><button className="helpfulBtn" id={`helpful${props.review_id}`} onClick={handleHelpful}><GoThumbsup /></button><span>({helpCount}) | </span>
      <button className="helpfulBtn" id={`report${props.review_id}`} onClick={handleReport}> <GoReport /></button>
    </div>

  )
}