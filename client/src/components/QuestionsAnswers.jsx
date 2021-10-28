import React, { useState, useEffect } from 'react';
import QuestionsList from './QuestionsList.jsx';
const axios = require('axios');
const config = require('../../../config.js');

function QuestionsAnswers () {
  const [list, setList] = useState([]);
  const options = {
    url: 'url',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.QATOKEN}`
    }
  }
  useEffect( () => {
    axios.get(options.url, options.headers).then( (response) => {
      setList(response);
    });
  });

  return (
    <div>
      <div>Questions and Answers</div>
      <QuestionsList questions={list} />
    </div>
  );


}

// class QuestionsAnswers extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list: []
//     }
//   }

//   render() {
//     return(
//       <div>PR Pull</div>
//     );
//   }
// }

export default QuestionsAnswers;