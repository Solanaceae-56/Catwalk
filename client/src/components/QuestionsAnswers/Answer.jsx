import React, { useState, useEffect } from 'react';
import moment from 'moment';

function Answer(props) {

return (
  <div className='answer'>
    <div className='body'>A: {props.item.body}</div>
    <div className='misc'>by {props.item['answerer_name']}, {moment().format(props.item.date)}</div>
    <div className='misc'>Helpful? 'yes'</div>
    <div className='misc'>Add Answer</div>
  </div>
)
}

export default Answer;