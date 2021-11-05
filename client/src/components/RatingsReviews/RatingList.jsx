import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  RatingSummary  from './RatingSummary.jsx';
import  ReviewBreakdown  from './ReviewBreakdown.jsx';
import ProductBreakdownList from './ProductBreakdownList.jsx';
export default function RatingList(props) {
  const [ratingData, setRatingData] = useState({});
  const [recommendRate,setRecommendRate] =useState(0);
  const [characteristics,setCharacteristics]=useState({});
  const setChar = props.setCharacter;
  useEffect(()=>{
    axios.get(`/reviews/meta/?product_id=${props.product_id}`)
    .then((response)=>{
      let recommend =Math.floor((+response.data.recommended[true]/(+(response.data.recommended[true])+(+response.data.recommended[false])))*100);
      setRecommendRate(recommend);
      setRatingData(response.data.ratings);
      setCharacteristics(response.data.characteristics);

      }
    )
  },[props])


  return (
    <div id="ratingListContainer">
      <RatingSummary product_id={props.product_id} ratingData = {ratingData} averageRating={props.averageRating}recommendRate={recommendRate}/>
      <ReviewBreakdown product_id={props.product_id} ratingData = {ratingData}/>
      <ProductBreakdownList product_id={props.product_id} characteristics = {characteristics}/>
    </div>

  )
}