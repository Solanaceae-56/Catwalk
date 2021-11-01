import React, { useState, useEffect } from 'react';
import ReviewList from "./ReviewList.jsx";
import ReviewBreakdown from "./ReviewBreakdown.jsx";
export default function RatingsReviews() {

    return (
      <div className="review">
        <ReviewList product_id="40344"/>
        <ReviewBreakdown />
      </div>
    )
  }