

import React, { useState, useEffect } from 'react';
import ProductBreakdown from "./ProductBreakdown.jsx";
import "./ProductBreakdown.css";
const characteristicsWords = {
  Size: ["A size too small", "Perfect", "A size too big"],
  Width: ["Too narrow", "Perfect", "Too wide"],
  Comfort: ["Uncomfortable", "Ok", "Perfect"],
  Quality: ["Poor", "Expected", "Perfect"],
  Length: ["Runs short", "Perfect", "Runs long"],
  Fit: ["Runs tight", "Perfect", "Runs loose"]
}
export default function ProductBreakdownList(props) {

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