import React, { useState, useEffect } from 'react';
import moment from 'moment';
const axios = require('axios');

function Answer(props) {
  //console.log(props.item);
  const [helpful, setHelpful] = useState(props.item.helpfulness);

  function click(e) {
    //debugger;
    //console.log(e.target.id);
    var putPath = e.target.id;
    //console.log(e.target.parentNode.id);
    var aId = Number(e.target.parentNode.id);
    axios.put("http://localhost:3000/qa/questions/put", { path: putPath, answerId: aId }).then((response) => {
      //console.log(response);
      if (putPath === 'helpfulanswer') {
        setHelpful(helpful + 1);
      }
    });
  };

  const photomap = props.item.photos.map((photo) =>
    <img src={photo} width="300" height="300"/>
  );

  // console.log(photomap, 'photomap');
  // if (props.item.photos.length !== 0) {
  //   debugger;
  //   return (
  //     <div className='answer' id={props.item.id}>
  //       <div className='body'>A: {props.item.body}</div>
  //       <div className='misc'>by {props.item['answerer_name']}, {moment.utc(props.item.date).format('MM/DD/YYYY')}</div>
  //       <div className='photos'>
  //         {photomap}
  //       </div>
  //       <div className='help'>Helpful?</div>
  //       <div className='helpful' id="helpfulanswer" onClick={click}> Yes ({helpful})</div>
  //       <div className='report' id='reportanswer' onClick={click}> Report? </div>
  //     </div>
  //   );
  // }

  return (
    <div className='answer' id={props.item.id}>
      <div className='body'>A: {props.item.body}</div>
      <div className='misc'>by {props.item['answerer_name']}, {moment.utc(props.item.date).format('MM/DD/YYYY')}</div>
      <div className='photos'>
        {photomap}
      </div>
      <div className='help'>Helpful?</div>
      <div className='helpful' id="helpfulanswer" onClick={click}> Yes ({helpful})</div>
      <div className='report' id='reportanswer' onClick={click}> Report? </div>
    </div>
  )
}

export default Answer;