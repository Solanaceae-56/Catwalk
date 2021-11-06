import React, { useState, useEffect } from 'react';
import { ReviewsContext } from "./RatingsReviews.jsx";
import RatingList from './RatingList.jsx';
import ReviewItem from "./ReviewItem.jsx";
import AddReview from "./AddReview.jsx";
import axios from 'axios'

export default function ReviewList(props) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [page, setPage] = useState(1);
  const [product_id, setProduct_id] = useState(props.product_id);
  const [totalReviews, setTotalReviews] = useState(0);
  const [characteristics,setCharacteristics]=useState({});

  useEffect(() => {
    axios.get('/reviews', { params: { product_id: product_id, sort: sort, page: page, count: count } })
      .then(
        response => {
          setReviews(response.data.results);
        })
      .catch(err => {
        console.log(err);
      })
  }
    , [sort, count, page,product_id]);
  useEffect(() => {
    axios.get('/reviews', { params: { product_id: product_id, sort: sort, page: page, count: 10000 } })
      .then(
        response => {
          setTotalReviews(response.data.results.length);
        })
      .catch(err => {
        console.log(err);
      })
  }
    , [product_id]);
  useEffect(()=>{
    setProduct_id(props.product_id)
  },[props])

  return (
    <ReviewsContext.Provider value ={{reviews,setReviews}}>
    <div className="reviewratingListContainer">
      <div className="reviewListContainer">
        <div>{totalReviews} reviews, sorted by<select name="sort" id="sort-select" onChange={(e) => { setSort(e.target.value) }}>
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
            onClick={() => { setCount(count + 2) }}
            style={(totalReviews - count < 2) ? { display: 'none' } : { display: 'inline' }}>MORE REVIEWS</button>

          <AddReview characteristics={characteristics}/>
        </div>
      </div>
      <div className="ratingListContainer">
        <RatingList product_id={product_id} averageRating={props.averageRating} num_Of_Ratings={props.num_Of_Ratings} setCharacter ={setCharacteristics} />
      </div>
    </div >
    </ReviewsContext.Provider>
  )
}