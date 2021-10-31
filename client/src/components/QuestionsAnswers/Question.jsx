import React, { useState, useEffect } from 'react';
import moment from 'moment';
import AnswersList from './AnswersList.jsx';
const axios = require('axios');


function Question(props) {
  console.log(props.data, 'data');
  console.log(props.data.answers);
  if (props.data.answers.length > 2) {
    //
  }
  function click (e) {
    debugger;
    //console.log(e.target.id);
    //console.log(e.target.parentNode.id)
    var putPath = e.target.id;
    var qId = Number(e.target.parentNode.id);
    //console.log(typeof(qId), qId);
    axios.put("http://localhost:3000/qa/questions/put", {path: putPath,  questionId: qId}).then((response) => {
      console.log(response);
    });
  }
  return (
    <div>
      <div className='question' id={props.data['question_id']}>
        <div className='qbody'>Q: {props.data['question_body']}</div>
        <div className='help'>Helpful?</div>
        <div className='helpful' id='helpfulquestion' onClick={click}> Yes ({props.data['question_helpfulness']})</div>
        <div className='report' id='reportquestion' onClick={click}>Report?
        </div>
      </div>
      <div className='answers'>
        <AnswersList data={props.data.answers}/>
        {/* <div className='misc'>by {props.data.answers['answerer_name']}, {moment().format(date)}</div>
        <div className='misc'>Helpful? 'yes'</div>
        <div className='misc'>Add Answer</div> */}
      </div>
    </div>
  );
};

export default Question;