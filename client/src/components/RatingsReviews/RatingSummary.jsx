import React, { useState, useEffect } from 'react';
import ReviewStars from "./ReviewStars.jsx";
export default function RatingSummary(props) {
  // const[averageRating,setAverageRating]=useState(0)
  // useEffect(()=>{
  //   setAverageRating(()=>)
  // },[props])
    return (
      <div className="ratingSummary">
      <h2>{(+props.averageRating).toFixed(1)}<ReviewStars /></h2>
      <div>{props.recommendRate}% of reviews recommend this product</div>
      </div>
    )
  }