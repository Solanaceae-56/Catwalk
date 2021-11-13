import React, { useState, useEffect, createContext } from 'react';
import ReviewList from "./ReviewList.jsx";
import RatingList from "./RatingList.jsx";
import "./RatingsReviews.css";
import axios from "axios";
export const ReviewsContext = createContext();
export default function RatingsReviews(props) {
  const [reviewState, setReviewState] = useState({
    product_id: props.product_id,
    rating: props.rating,
    num_Of_Ratings: props.num_Of_Ratings
  })

  useEffect(() => {


    setReviewState(() => ({
      product_id: props.product_id,
        rating: props.rating,
          num_Of_Ratings: props.num_Of_Ratings
    }))
  }, [props])
  const handleInterClick =(e)=>{


    let obj ={
      element:e.target.className,
      widget:"ratings&reviews",
      time:Date()
    }
    axios.post("/interactions",obj)
    .then((res)=>{
    }).catch((err)=>{
    })
  }
  return (

    <div className="review" onClick={handleInterClick}>
      <h1 className="sectionTitle">Ratings & Reviews</h1>
      <ReviewList product_id={reviewState.product_id} averageRating={reviewState.rating} num_Of_Ratings={reviewState.num_Of_Ratings} />

    </div>

  )
}