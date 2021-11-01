import React, { useState, useEffect } from 'react';
import ReviewItem from "./ReviewItem.jsx";
import axios from 'axios'

export default function ReviewList(props) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(5);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [product_id, setProduct_id] = useState(props.product_id);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    console.log(sort);
    axios.get('/reviews', { params: { product_id: product_id, sort: sort, page: page, count: count } })
      .then(
        response => {
          console.log('called reviews api');
          console.log(response.data)
          setReviews(response.data.results);
        })
      .catch(err => {
        console.log(err);
      })
  }
    , [sort]);
  useEffect(() => {
    axios.get('/reviews/meta', { params: { product_id: product_id } })
      .then(
        response => {
          let total = 0;
          for (let i = 1; i <= 5; i++) {
            total += Number(response.data.ratings[i]);
          }
          setTotalReviews(total);
        })
      .catch(err => {
        console.log(err);
      })
  }
    , [product_id]);

  return (
    <div className="reviewListContainer">
      <div>{totalReviews}reviews, sorted by<select name="sort" id="sort-select" onChange={(e)=>{setSort(e.target.value)}}>
        <option value="">--Please choose an option--</option>
        <option value="helpful">Helpful</option>
        <option value="newiest">Newest</option>
        <option value="relevant">Relevant</option>
      </select></div>
      <div className="reviewListContent">{
        reviews.map(review => {
          return <ReviewItem
            key={review.review_id}
            reviewData={review}
          />
        })
      }
      </div>
    </div>
  )
}