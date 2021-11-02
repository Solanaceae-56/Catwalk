import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  RatingSummary  from './RatingSummary.jsx';
import  Breakdown  from './Breakdown.jsx';
export default function ReviewBreakdown(props) {
  useEffect(()=>{
    axios.get(`/reviews/meta/?product_id=${props.product_id}`)
    .then((data)=>{
      console.log(data);
    })
  },[])
  return (
    <div id="reviewBreakdownContainer">
      <RatingSummary product_id={props.product_id}/>
      <Breakdown />
    </div>

  )
}