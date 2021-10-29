import React, { useState, useEffect } from 'react';
import moment from 'moment';

function Question(props) {
  if (props.data.answers.length > 2) {
    //
  }
  var date = props.data.answers.date;
  return (
    <div>
      <li id={props.data['question_id']}>
        <div class='question'>Q: {props.data['question_body']}</div>
        <div class='answer'>A: {props.data.answers.body}</div>
        <div class='misc'>by {props.data.answers['answerer_name']}, {moment().format(date)}</div>
        <div class='misc'>Helpful? 'yes'</div>
        <div class='misc'>Add Answer</div>
      </li>
    </div>
  );
};

export default Question;