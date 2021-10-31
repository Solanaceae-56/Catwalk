import React, { useState, useEffect } from 'react';
import ReviewItem from "./ReviewItem.jsx";
import axios from 'axios'

export default function ReviewList() {
  useEffect(() => {
    axios.get('/reviews', {params: { product_id: 40344, sort: "newest" }}).then(
      data => {
        console.log(data.data);
      })
  }, []);

  return (
    <div>
      <ReviewItem />
    </div>
  )
}