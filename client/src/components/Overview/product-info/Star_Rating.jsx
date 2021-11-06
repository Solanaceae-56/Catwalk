import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Star_Rating(props) {
  const [rating, setRating] = useState(0);
  const [reviewTotal, setReviewTotal] = useState(0);

  useEffect(() => {
    let mounted = true;
    axios.get("http://localhost:3000/reviews/meta", {params: {product_id: props.productId}})
    .then((data) => {
      var total = 0;
      var votes = 0;
      for (var key = 1; key <= 5; key++) {
        total += key * parseInt(data.data.ratings[key], 10);
        votes += parseInt(data.data.ratings[key], 10);
      }
      var average = Math.round(1000*total/votes)/1000;
      setRating((average/5 * 100) + "%");
      setReviewTotal(votes);
    })
    .catch((err) => {
      setRating(0);
    });

    return function cleanup() {
      mounted = false;
    }
  }, [props.product_id]);

  return (
    <div id='star-rating'>
      {props.rating}
      <a> Read all {props.reviewTotal} reviews</a>
    </div>
  );
}


export default Star_Rating;