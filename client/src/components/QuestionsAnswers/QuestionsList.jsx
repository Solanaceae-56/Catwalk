import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';

function QuestionsList(props) {
  //const [list, setList] = useState([]);
  var test = [];
  console.log(props.answers, 'questionslist');
  //console.log(props.questions, 'inquestions');
  for (var i = 0; i < props.questions.length; i++) {
    test.push(<Question data={props.questions[i]} />);
    if (test.length === 4) {
      break;
    }
  }

  return (
    <div>
      <ul>
        {test}
      </ul>
    </div>
  )
};

export default QuestionsList;