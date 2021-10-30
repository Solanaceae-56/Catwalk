import React, { useState, useEffect } from 'react';
import moment from 'moment';
import AnswersList from './AnswersList.jsx';


function Question(props) {
  console.log(props.data, 'data');
  console.log(props.data.answers);
  if (props.data.answers.length > 2) {
    //
  }
  var date = props.data.answers.date;
  return (
    <div>
      <li id={props.data['question_id']}>
        <div className='question'>Q: {props.data['question_body']}</div>
        <div className='answer'>A: {props.data.answers.body}</div>
        <AnswersList data={props.data.answers}/>
        {/* <div className='misc'>by {props.data.answers['answerer_name']}, {moment().format(date)}</div>
        <div className='misc'>Helpful? 'yes'</div>
        <div className='misc'>Add Answer</div> */}
      </li>
    </div>
  );
};

export default Question;