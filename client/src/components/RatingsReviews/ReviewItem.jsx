import React, { useState, useEffect } from 'react';
import ReviewStars from "./ReviewStars.jsx";
import Helpful from "./Helpful.jsx";
export default function ReviewItem(props) {
  return (
    <div className="reviewItemContainer">
      <ReviewStars value={props.reviewData.rating} />
      <div className="reviewUserDateContainer"><span className="reviewUserName">{props.reviewData.reviewer_name}, </span><span className="reviewDate">{props.reviewData.date}</span></div>
      <div className = "reviewSummary">{props.reviewData.summary}</div>
      <div className = "reviewBody">{props.reviewData.body}</div>
      <Helpful />
    </div>

  )
}