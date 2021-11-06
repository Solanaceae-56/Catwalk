import React, { useState, useEffect, useContext } from 'react';
import { ReviewsContext } from "./RatingsReviews.jsx";
import "./ReviewBreakdown.css"
export default function ReviewBreakdown(props) {
  const [ratingData, setRatingData] = useState(props.ratingData);
  const [totalStar, setTotalStar] = useState('');
  const [filterState, setFilterState] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false })
  let filteredKey = Object.keys(filterState).filter((key) => { return filterState[key] === true });
  let reviewsContext = useContext(ReviewsContext);

  useEffect(() => {
    setRatingData(props.ratingData);
    //console.log(ratingData)
    setTotalStar((+props.ratingData['5']) + (+props.ratingData['4']) + (+props.ratingData['3']) + (+props.ratingData['2']) + (+props.ratingData['1']));

  }, [props.ratingData])
  useEffect(() => {
    reviewsContext.setReviews(reviewsContext.initialReviews);
    let filteredKey = Object.keys(filterState).filter((key) => { return filterState[key] === true });
    if(filteredKey.length===0){
      return;
    }
    let newArr = reviewsContext.initialReviews;
    let filteredArr = newArr.filter((item) => { return filteredKey.indexOf(item.rating.toString()) !== -1 });
    reviewsContext.setReviews(filteredArr)
    console.log(newArr,"new");
    console.log(filteredKey, "key");
    console.log(filteredArr, "filterarr");
  }, [filterState])

  const filterStars = (e) => {
    let index = e.target.innerHTML[0];
    setFilterState({ ...filterState, [index]: !filterState[index] })
    let keys = Object.keys(filterState);
    let filterKey = keys.filter((key) => {
      filterState[key] === true;
    })

  }
  const clearFilter=()=>{
    setFilterState({ 1: false, 2: false, 3: false, 4: false, 5: false });
  }
  return (
    <div className="reviewBreakdown">
      <div className="reviewBarContainer"><span onClick={filterStars}>5 stars</span><div className="reviewBar"><div style={{ width: `${((+ratingData['5']) / (+totalStar)) * 100}%` }}></div></div></div>
      <div className="reviewBarContainer"><span onClick={filterStars}>4 stars </span><div className="reviewBar"><div style={{ width: `${((+ratingData['4']) / (+totalStar)) * 100}%` }}></div></div></div>
      <div className="reviewBarContainer"><span onClick={filterStars}>3 stars </span><div className="reviewBar"><div style={{ width: `${((+ratingData['3']) / (+totalStar)) * 100}%` }}></div></div></div>
      <div className="reviewBarContainer"><span onClick={filterStars}>2 stars </span><div className="reviewBar"><div style={{ width: `${((+ratingData['2']) / (+totalStar)) * 100}%` }}></div></div></div>
      <div className="reviewBarContainer"><span onClick={filterStars}>1 stars </span><div className="reviewBar"><div style={{ width: `${((+ratingData['1']) / (+totalStar)) * 100}%` }}></div></div></div>
      <div className="filterBtnContainer">
        {
          (filteredKey === undefined) ? null : filteredKey.map((key) => (<button onClick={filterStars} key={key}>{key}</button>))
        }
        {
          (filteredKey.length===0) ? null: <button onClick={clearFilter} >ClearFilter</button>
        }
      </div>
    </div>
  )
}