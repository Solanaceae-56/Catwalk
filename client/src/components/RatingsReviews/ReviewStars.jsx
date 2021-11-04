import React, { useState, useEffect } from 'react';
import "./ReviewStars.css"
export default function ReviewStars(props) {
  const [starNum,setStarNum] = useState(0);
  useEffect(()=>{
    if(props.value%0.25 > 0.125){
      setStarNum(Math.floor(props.value/0.25)+1);
    } else{
    setStarNum(Math.floor(props.value/0.25))
    }
  },[props])
return (
  <div>
  <div><span className={`stars-container stars-${starNum}`}>★★★★★</span></div>

</div>
)
}