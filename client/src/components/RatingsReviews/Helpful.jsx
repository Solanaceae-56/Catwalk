import React, { useState, useEffect } from 'react';
export default function Helpful(props) {
  const [helpCount, setHelpCount]=useState(props.helpCount)
  // useEffect(()=>{
  //   axios.put('/reviews/:review_id/helpful',params:{review_id:props.review_id})
  // },[])
  // useEffect(()=>{
  //   axios.put('/reviews/:review_id/report',params:{review_id:props.review_id})
  // },[])
  return (
    <div>
      <div>Helpful?<button>Yes</button><span>({props.helpCount})|</span><button>Report</button></div>


    </div>

  )
}