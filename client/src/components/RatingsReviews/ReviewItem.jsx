import React, { useState, useEffect } from 'react';
import ReviewStars from "./ReviewStars.jsx";
import Helpful from "./Helpful.jsx";
export default function ReviewItem() {
  return (
    <div>
      <ReviewStars value={3}/>
      <div><span>Review username, </span><span>Review date</span></div>
      <div>Review summary</div>
      <div>Review body</div>
      <Helpful/>
    </div>

  )
}