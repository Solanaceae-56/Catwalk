import React, { useState, useEffect } from 'react';
export default function ReviewBreakdown(props) {
  console.log(props.ratingData)
  const [ratingData,setRatingData]=useState(props.ratingData);
  const [totalStar, setTotalStar]=useState('');
  useEffect(()=>{
    setRatingData(props.ratingData);
    setTotalStar((+ratingData['5'])+(+ratingData['4'])+(+ratingData['3'])+(+ratingData['2'])+(+ratingData['1']));
  },[props])
    return (
      <div className="reviewBreakdown">
      <div><span>5 stars </span>{ratingData['5']}</div>
      <div><span>4 stars </span>{ratingData['4']}</div>
      <div><span>3 stars </span>{ratingData['3']}</div>
      <div><span>2 stars </span>{ratingData['2']}</div>
      <div><span>1 star  </span>{ratingData['1']}</div>
      <div>{totalStar}</div>
      </div>
    )
  }