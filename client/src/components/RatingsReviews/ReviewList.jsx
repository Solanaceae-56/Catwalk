import React, { useState, useEffect } from 'react';
import ReviewItem from "./ReviewItem.jsx";
import axios from 'axios'

export default function ReviewList(props) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [page, setPage] = useState(1);
  const [product_id, setProduct_id] = useState(props.product_id);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    axios.get('/reviews', { params: { product_id: product_id, sort: sort, page: page, count: count } })
      .then(
        response => {
          //console.log('called reviews api');
          //console.log(response.data.results.length);
          setReviews(response.data.results);
        })
      .catch(err => {
        console.log(err);
      })
  }
    , [sort,count,page]);
  useEffect(() => {
    axios.get('/reviews', { params: {product_id: product_id,sort: sort, page: page, count: 10000 }})
      .then(
        response => {
          setTotalReviews(response.data.results.length);
        })
      .catch(err => {
        console.log(err);
      })
  }
    , [product_id]);

  const addmoreReviews = ()=>{

  }
  return (
    <div className="reviewListContainer">
      <div>{totalReviews} reviews, sorted by<select name="sort" id="sort-select" onChange={(e)=>{setSort(e.target.value)}}>
        <option value="relevant">Relevant</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
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
      <div className="reviewListFooter">
        <button
        id="moreReviews"
        onClick={()=>{setCount(count+2)}}
        style={(totalReviews-count<2)?{display:'none'}:{display:'inline'}}>MORE REVIEWS</button>
        <button id ="addReview">ADD A REVIEW +</button>
      </div>
    </div>
  )
}