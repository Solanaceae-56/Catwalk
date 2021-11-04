

import React, { useState, useEffect } from 'react';
import ProductBreakdown from "./ProductBreakdown.jsx";
import "./ProductBreakdown.css";
export default function ProductBreakdownList(props) {
  const characteristicsWords = {
    Size: ["A size too small", "Perfect", "A size too big"],
    Width: ["Too narrow", "Perfect", "Too wide"],
    Comfort: ["Uncomfortable", "Ok", "Perfect"],
    Quality: ["Poor", "What I expected", "Perfect"],
    Length: ["Runs short", "Perfect", "Runs long"],
    Fit: ["Runs tight", "Perfect", "Runs loose"]
  }
  const [characterKeys,setCharacterKeys] = useState([]);
  const [character,setCharacter] = useState({});
  useEffect(() => {
    setCharacterKeys(Object.keys(props.characteristics));
    setCharacter(props.characteristics);
  }, [props])
  return (
    characterKeys.map((key)=>{
      return <ProductBreakdown words={characteristicsWords[key]} title={key} value={character[key].value} key={character[key].id}/>
    })
  )
}