import React, { useState, useEffect } from 'react';
import ReviewStars from "./ReviewStars.jsx";
import Helpful from "./Helpful.jsx";
import moment from 'moment';
export default function ReviewItem(props) {
  return (
    <div className="reviewItemContainer">
      <ReviewStars value={props.reviewData.rating} />
      <div className="reviewUserDateContainer"><span className="reviewUserName">{props.reviewData.reviewer_name}, </span><span className="reviewDate">{moment(props.reviewData.date).format("LL")}</span></div>
      <div className="reviewSummary">{props.reviewData.summary}</div>
      <div className="reviewBody">{props.reviewData.body}</div>
      <div className="reviewRecommend" style={(props.reviewData.recommend) ? { display: 'inline' } : { display: 'none' }}>✓ I recommend this product</div>
      {(props.reviewData.response) ? <div className="reviewReponse">Response: {props.reviewData.response}</div> : null}



      <Helpful helpCount={props.reviewData.helpfulness} review_id={props.reviewData.review_id} />
    </div>

  )
}