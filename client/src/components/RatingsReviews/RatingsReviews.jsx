import React, { useState, useEffect,createContext } from 'react';
import ReviewList from "./ReviewList.jsx";
import RatingList from "./RatingList.jsx";
export const ReviewsContext = createContext();
export default function RatingsReviews(props) {

    return (
      <div className="review">
        <h2>Ratings & Reviews</h2>
        <ReviewList product_id={40344}averageRating={props.rating} num_Of_Ratings={props.num_Of_Ratings}/>

      </div>
    )
  }