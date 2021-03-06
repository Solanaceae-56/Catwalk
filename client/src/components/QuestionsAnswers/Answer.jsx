import React, { useState, useEffect, useContext } from 'react';
import { GoThumbsup, GoReport } from 'react-icons/go';
import moment from 'moment';
import AppContext from '../../index.jsx';
import { QuestionsContext } from './QuestionsAnswers.jsx';
const axios = require('axios');

function Answer(props) {
  const [helpfulness, setHelpfulness] = useState(props.item.helpfulness);
  const [disable, setDisable] = useState(false);
  const darkMode = useContext(AppContext);
  const postInt = useContext(QuestionsContext);


  useEffect(() => {
    setHelpfulness(props.item.helpfulness);
  }, [props.item])

  function handleHelpful(e) {
    var putPath = 'helpfulanswer';
    var aId = props.item.id;
    axios.put("/qa/questions/put", { path: putPath, answerId: aId }).then((response) => {
      if (putPath === 'helpfulanswer') {
        setHelpfulness(helpfulness + 1);
      }
    });
    setDisable(true);
  };

  function handleReport(e) {
    var putPath = 'reportanswer';
    var qId = props.data['question_id'];
    axios.put("/qa/questions/put", { path: putPath, questionId: qId }).then((response) => {
      if (putPath === 'helpfulquestion') {
        setHelpful(helpful + 1);
      }
    });
    setDisable(true);
  }

  const inline = {
    display: "inline-block"
  }
  const photomap = props.item.photos.map((photo, i) =>
    <img className="images" key={i} src={photo} width="150" height="150"/>
  );

  var buttonStyle = {};
  var boldStyle = {
    'fontSize': '15pt'
  };
  if (darkMode) {
    boldStyle.color = 'rgb(100, 232, 241)';
    buttonStyle['backgroundColor'] = 'rgb(60, 60, 60)';
    buttonStyle['color'] = 'white';
  }
  var answerer = props.item['answerer_name'];
  if (props.item['answerer_name'] === "Seller") {
    answerer = <b style={boldStyle}>{props.item['answerer_name']}</b>
  }

  return (
    <div className='answer' id={props.item.id} key={props.keyvalue} >
      <div className='body'>A: {props.item.body}</div>
      <div className='answerer'>by {answerer}, {moment.utc(props.item.date).format('MM/DD/YYYY')} | Helpful? <button style={buttonStyle} id='helpfulanswer' className="helpfulBtn" disabled={disable} onClick={(e) => { handleHelpful(e); postInt.handlePost(e) }}><GoThumbsup /></button> <span> ({helpfulness}) | </span> <button style={buttonStyle} id='reportanswer' className="helpfulBtn" disabled={disable} onClick={(e) => { handleReport(e); postInt.handlePost(e) }}><GoReport /></button></div>
      <div className='photos'>
        {photomap}
      </div>
    </div>
  )
}

export default Answer;