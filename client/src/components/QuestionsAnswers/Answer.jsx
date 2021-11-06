import React, { useState, useEffect } from 'react';
import moment from 'moment';
const axios = require('axios');

function Answer(props) {
  //console.log(props.item);
  const [helpfulness, setHelpfulness] = useState(props.item.helpfulness);

  useEffect( () => {

  }, [])

  function click(e) {
    //debugger;
    //console.log(e.target.id);
    var putPath = e.target.id;
    //console.log(e.target.parentNode.id);
    var aId = Number(e.target.parentNode.id);
    axios.put("http://localhost:3000/qa/questions/put", { path: putPath, answerId: aId }).then((response) => {
      //console.log(response);
      if (putPath === 'helpfulanswer') {
        setHelpfulness(helpfulness + 1);
      }
    });
  };

  const photomap = props.item.photos.map((photo) =>
    <img src={photo} width="300" height="300"/>
  );
  var answerer = props.item['answerer_name'];
  if (props.item['answerer_name'] === "Seller") {
    answerer = <b>{props.item['answerer_name']}</b>
  }

  return (
    <div className='answer' id={props.item.id}>
      <div className='body'>A: {props.item.body}</div>
      <div className='misc'>by {answerer}, {moment.utc(props.item.date).format('MM/DD/YYYY')}</div>
      <div className='photos'>
        {photomap}
      </div>
      <div className='help'>Helpful?</div>
      <div className='helpful' id="helpfulanswer" onClick={click}> Yes ({helpfulness})</div>
      <div className='report' id='reportanswer' onClick={click}> Report? </div>
    </div>
  )
}

export default Answer;