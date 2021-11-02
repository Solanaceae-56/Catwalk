import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Helpful(props) {
  const [helpCount, setHelpCount]=useState(props.helpCount)
  function handleHelpful(){
    let serverUrl = `/reviews/${props.review_id}/helpful`
    axios.put(serverUrl).then(()=>{
      setHelpCount(helpCount+1);
      document.getElementById(`helpful${props.review_id}`).disabled=true;
    })
  }
  function handleReport(){
    let serverUrl = `/reviews/${props.review_id}/report`
    axios.put(serverUrl).then(()=>{
      document.getElementById(`report${props.review_id}`).disabled=true;
    })
  }
  return (
    <div>
      <div>Helpful?<button id={`helpful${props.review_id}`} onClick={handleHelpful}>Yes</button><span>({helpCount})|</span>
      <button id={`report${props.review_id}`} onClick={handleReport}>Report</button></div>


    </div>

  )
}