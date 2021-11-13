import React, {useContext} from 'react';
import axios from 'axios';
import ReviewStars from '../../RatingsReviews/ReviewStars.jsx';
import AppContext from '../../../index.jsx';

function Star_Rating(props) {
  var dark = useContext(AppContext);
  var lineColor;
  var refColor;
  if (dark) {
    lineColor = 'lineDark';
    refColor = 'darkRefLink'
  } else {
    lineColor = 'lineLight';
    refColor = 'lightRefLink';
  }

  return (
    <div className={lineColor} id='star-rating'>
      <ReviewStars value={props.rating}/>
      <a className={refColor} id='readAll' href='http://localhost:3000/index.html#ratingsReviews'> See all {props.reviewTotal} ratings</a>
    </div>
  );
}


export default Star_Rating;