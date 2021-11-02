import React, { useState, useEffect } from 'react';
import ReviewStars from "./ReviewStars.jsx";
export default function RatingSummary() {

    return (
      <div className="ratingSummary">
      RatingSummary
      <h2>AverageRating<ReviewStars /></h2>
      </div>
    )
  }