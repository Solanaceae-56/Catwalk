import React, { useState, useEffect,useContext } from 'react';
import ReviewStars from "./ReviewStars.jsx";
import Helpful from "./Helpful.jsx";
import moment from 'moment';
import AppContext from "../../index.jsx";
import "./ReviewItem.css"
export default function ReviewItem(props) {
const darkmode = useContext(AppContext);
  return (
    <div className="reviewItemContainer">
      <div className="reviewStarNameContainer">
      <ReviewStars value={props.reviewData.rating} />
      <div className="reviewUserDateContainer"><span className="reviewUserName">{props.reviewData.reviewer_name}, </span><span className="reviewDate">{moment(props.reviewData.date).format("LL")}</span></div>
      </div>
      <div className="reviewSummary">{props.reviewData.summary}</div>
      <div className="reviewBody">
        <div className="imageRow">
        {
          (props.reviewData.photos.length !== 0) ?
            props.reviewData.photos.map((photo) => <img className="reviewItemPhoto" src={photo.url} key={photo.id} />) : null
        }
        </div>
        {props.reviewData.body}
      </div>
      <div className="reviewRecommend" style={(props.reviewData.recommend) ? { display: 'inline' } : { display: 'none' }}>✓ I recommend this product</div>
      {(props.reviewData.response) ? <div className="reviewReponse">Response: {props.reviewData.response}</div> : null}
      <Helpful helpCount={props.reviewData.helpfulness} review_id={props.reviewData.review_id} />
      <div className="breakline" style={darkmode?{backgroundColor:"white"}:{backgroundColor:"black"}}></div>
    </div>

  )
}