import React, {useState} from 'react';
import axios from 'axios';
import API_KEY from '../../../../config.js';

function Star_Rating(props) {
  const [rating, setRating] = useState(0);
  axios.get("http://localhost:3000/reviews/meta", {params: {id: props.productId, path: "/reviews/meta"}})
    .then((data) => {
      var total = 0;
      var votes = 0;
      for (var key = 1; key <= 5; key++) {
        total += key * parseInt(data.data.ratings[key], 10);
        votes += parseInt(data.data.ratings[key], 10);
      }
      setRating(Math.round(100*total/votes)/100);
    })
    .catch((err) => {
      console.log('here');
      setRating(0);
    });

  return (
    <div>{rating}</div>
  );
}

export default Star_Rating;