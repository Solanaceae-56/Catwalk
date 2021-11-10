

import React, { useState, useEffect } from 'react';
import ProductBreakdown from "./ProductBreakdown.jsx";
import "./ProductBreakdown.css";
const characteristicsWords = {
  Size: ["Small", "Perfect", "Big"],
  Width: ["Narrow", "Perfect", "Wide"],
  Comfort: ["Uncomfortable", "Ok", "Perfect"],
  Quality: ["Poor", "Expected", "Perfect"],
  Length: ["Short", "Perfect", "Long"],
  Fit: ["Tight", "Perfect", "Loose"]
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