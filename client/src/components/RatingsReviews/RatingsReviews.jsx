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
  // const [product_id, setProduct_id]=useState(props.product_id);
  // const [rating, setRating]=useState(props.rating);
  // const [num_Of_Ratings, setNum_Of_Ratings]=useState(props.num_Of_Ratings);
  useEffect(() => {
    // setProduct_id(props.product_id);
    // setRating(props.rating);
    // setNum_Of_Ratings(props.num_Of_Ratings);

    setReviewState(() => ({
      product_id: props.product_id,
        rating: props.rating,
          num_Of_Ratings: props.num_Of_Ratings
    }))
  }, [props])
  const handleInterClick =(e)=>{
    // console.log(e.target.tagName);
    // console.log("Review Widge");
    // console.log(Date());

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
    //<ReviewWidge.Provider value={handleInterClick}>
    <div className="review" onClick={handleInterClick}>
      <h1 className="sectionTitle">Ratings & Reviews</h1>
      <ReviewList product_id={reviewState.product_id} averageRating={reviewState.rating} num_Of_Ratings={reviewState.num_Of_Ratings} />

    </div>
    //</ReviewWidge.Provider>
  )
}