import React, { useState, useEffect, createContext } from 'react';
import ReviewList from "./ReviewList.jsx";
import RatingList from "./RatingList.jsx";
import "./RatingsReviews.css";
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
  return (
    <div className="review">
      <h2 className="sectionTitle">Ratings & Reviews</h2>
      <ReviewList product_id={reviewState.product_id} averageRating={reviewState.rating} num_Of_Ratings={reviewState.num_Of_Ratings} />

    </div>
  )
}