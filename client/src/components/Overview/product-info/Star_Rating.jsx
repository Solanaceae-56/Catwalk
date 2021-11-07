import React from 'react';
import axios from 'axios';
import ReviewStars from '../../RatingsReviews/ReviewStars.jsx';

function Star_Rating(props) {

  return (
    <div id='star-rating'>
      <ReviewStars value={props.rating}/>
      <a> Read all {props.reviewTotal} reviews</a>
    </div>
  );
}


export default Star_Rating;