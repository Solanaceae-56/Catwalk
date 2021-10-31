import React, { useState, useEffect } from 'react';
export default function ReviewStars(value) {
  const stars = []
  let rating = value;
  let activeColor = "yellow";
  let inactiveColor = "lightgray"
  for (let i = 0; i < 5; i++) {
    let starObj = {}
    if (i > value) {
      starObj = {
        star: '★',
        color: inactiveColor,
        index: i
      }
    } else {
      starObj = {
        star: '★',
        color: activeColor,
        index: i
      }
    }
    stars.push(starObj);
    console.log(stars)
  }

return (
  <div>
    ReviewStars
    {stars.map(s => (<span key={s.index}>{s.star}</span>))}
  </div>

)
}