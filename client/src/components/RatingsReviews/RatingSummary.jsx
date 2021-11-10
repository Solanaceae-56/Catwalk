import React, { useState, useEffect } from 'react';
import ReviewStars from "./ReviewStars.jsx";
import "./RatingSummary.css";
export default function RatingSummary(props) {
  // const[averageRating,setAverageRating]=useState(0)
  // useEffect(()=>{
  //   setAverageRating(()=>)
  // },[props])
  return (
    <div>
      <div className="ratingSummary"><h1>{(+props.averageRating).toFixed(1)}</h1>
        <h2><ReviewStars value={+props.averageRating} /></h2>
      </div>
      <div className="ratingRecommend">{+props.recommendRate}% of reviews recommend this product</div>
    </div>
  )
}