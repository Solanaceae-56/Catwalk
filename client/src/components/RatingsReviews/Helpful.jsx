import React, { useState, useEffect, useContext } from 'react';
import { GoThumbsup, GoReport } from "react-icons/go";
import axios from 'axios';
import "./Helpful.css";
import AppContext from "../../index.jsx";
export default function Helpful(props) {
  const [helpCount, setHelpCount] = useState(props.helpCount);
  const [clickSwitch, setClickSwitch] = useState(true);
  const darkmode = useContext(AppContext);
  function handleHelpful() {
    if (clickSwitch) {
      let serverUrl = `/reviews/${props.review_id}/helpful`;
      axios.put(serverUrl).then(() => {
        setHelpCount(helpCount + 1);
        setClickSwitch(false);
      })
    }
  }
  function handleReport() {
    if (clickSwitch) {
      let serverUrl = `/reviews/${props.review_id}/report`
      axios.put(serverUrl).then(() => {
        setClickSwitch(false);
      })
    }
  }
  return (
    <div className="helpfulContainer">
      <div>Helpful?</div><button className={darkmode ? "helpfulBtnDark" : "helpfulBtn"} id={`helpful${props.review_id}`} onClick={handleHelpful}><GoThumbsup /><span>({helpCount}) | </span></button>
      <button className={darkmode ? "helpfulBtnDark" : "helpfulBtn"} id={`report${props.review_id}`} onClick={handleReport}> <GoReport /></button>
    </div>

  )
}