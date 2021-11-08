import React, { useState, useEffect} from 'react';
import axios from 'axios';
import  RatingSummary  from './RatingSummary.jsx';
import  ReviewBreakdown  from './ReviewBreakdown.jsx';
import ProductBreakdownList from './ProductBreakdownList.jsx';
export default function RatingList(props) {
  const [ratingState, setRatingState]=useState({
    ratingData:{},
    recommendRate:0,
    characteristics:{}
  })
  // const [ratingData, setRatingData] = useState({});
  // const [recommendRate,setRecommendRate] =useState(0);
  // const [characteristics,setCharacteristics]=useState({});
  useEffect(()=>{
    axios.get(`/reviews/meta/?product_id=${props.product_id}`)
    .then((response)=>{
      let recommend;
      //{true:"2"}
      if(response.data.recommended[true]===undefined){
        recommend = 0;
      }else if(response.data.recommended[false]===undefined){
        recommend=100;
      } else{
       recommend =Math.floor((+response.data.recommended[true]/(+(response.data.recommended[true])+(+response.data.recommended[false])))*100);
      }
      // setRecommendRate(recommend);
      // setRatingData(response.data.ratings);
      // setCharacteristics(response.data.characteristics);

      setRatingState({

        ratingData:response.data.ratings,
        recommendRate:recommend,
        characteristics:response.data.characteristics
      })
      }
    )
  },[props.product_id])
  return (
    <div id="ratingListContainer">
      <RatingSummary product_id={props.product_id} ratingData = {ratingState.ratingData} averageRating={props.averageRating}recommendRate={ratingState.recommendRate}/>
      <ReviewBreakdown product_id={props.product_id} ratingData = {ratingState.ratingData}/>
      <ProductBreakdownList product_id={props.product_id} characteristics = {ratingState.characteristics}/>
    </div>

  )
}