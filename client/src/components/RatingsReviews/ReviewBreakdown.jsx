import React, { useState, useEffect } from 'react';
import "./ReviewBreakdown.css"
export default function ReviewBreakdown(props) {
  const [ratingData,setRatingData]=useState(props.ratingData);
  const [totalStar, setTotalStar]=useState('');
  useEffect(()=>{
    setRatingData(props.ratingData);
    setTotalStar((+ratingData['5'])+(+ratingData['4'])+(+ratingData['3'])+(+ratingData['2'])+(+ratingData['1']));
  },[props])
    return (
      <div className="reviewBreakdown">
      <div className="reviewBarContainer"><span>5 stars</span><div className = "reviewBar"><div style={{width:`${((+ratingData['5'])/(+totalStar))*100}%`}}></div></div></div>
      <div className="reviewBarContainer"><div>4 stars </div><div className = "reviewBar"><div style={{width:`${((+ratingData['4'])/(+totalStar))*100}%`}}></div></div></div>
      <div className="reviewBarContainer"><div>3 stars </div><div className = "reviewBar"><div style={{width:`${((+ratingData['3'])/(+totalStar))*100}%`}}></div></div></div>
      <div className="reviewBarContainer"><div>2 stars </div><div className = "reviewBar"><div style={{width:`${((+ratingData['2'])/(+totalStar))*100}%`}}></div></div></div>
      <div className="reviewBarContainer"><div>1 stars </div><div className = "reviewBar"><div style={{width:`${((+ratingData['1'])/(+totalStar))*100}%`}}></div></div></div>

      </div>
    )
  }