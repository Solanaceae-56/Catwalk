import React from 'react';
import axios from 'axios';
import API_KEY from '../../../../config.js';

function Star_Rating(props) {
  axios.get("http://localhost:3000/reviews/meta", {params: {id: props.productId, path: "/reviews/meta"}})
    .then((data) => {
      console.log(data);
      return <div>Success</div>;
    })
    .catch((err) => {
      return <div>Failed</div>;
    });
}

export default Star_Rating;