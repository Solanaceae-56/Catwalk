import React, { useState, useEffect } from 'react';
import ReviewList from "./ReviewList.jsx";
import ReviewBreakdown from "./ReviewBreakdown.jsx";
export default function RatingsReviews() {

    return (
      <div className="review">
        <h2>Ratings & Reviews</h2>
        <ReviewList product_id="40344"/>
        <ReviewBreakdown product_id="40344"/>
      </div>
    )
  }