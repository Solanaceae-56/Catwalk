import React, { useState, useEffect } from 'react';
import moment from 'moment';
const axios = require('axios');

function Answer(props) {
  //console.log(props.item);
  const [helpfulness, setHelpfulness] = useState(props.item.helpfulness);
  const [disable, setDisable] = useState(false);

  useEffect( () => {
    setHelpfulness(props.item.helpfulness);
  }, [props.item])

  function click(e) {
    //debugger;
    //console.log(e.target.id);
    var putPath = e.target.id;
    //console.log(e.target.parentNode.id);
    var aId = Number(e.target.parentNode.parentNode.id);
    axios.put("/qa/questions/put", { path: putPath, answerId: aId }).then((response) => {
      //console.log(response);
      if (putPath === 'helpfulanswer') {
        setHelpfulness(helpfulness + 1);
      }
    });
    setDisable(true);
  };

  const inline = {
    display: "inline-block"
  }
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
      <div className='answerer'>by {answerer}, {moment.utc(props.item.date).format('MM/DD/YYYY')}</div>
      <div className='help'>Helpful? <button id='helpfulanswer' disabled={disable} onClick={click}>Yes ({helpfulness}) </button> <button id='reportanswer' disabled={disable} onClick={click}>Report</button></div>
      {/* <div className='helpful' id="helpfulanswer" onClick={click}> Yes ({helpfulness})</div>
      <div className='report' id='reportanswer' onClick={click}> Report? </div> */}
      <div className='photos'>
        {photomap}
      </div>
    </div>
  )
}

export default Answer;