import React from 'react';

function Star_Rating(props) {

  return (
    <div>
      {props.rating}
      <a> Read all {props.reviewTotal} reviews</a>
    </div>
  );
}

export default Star_Rating;