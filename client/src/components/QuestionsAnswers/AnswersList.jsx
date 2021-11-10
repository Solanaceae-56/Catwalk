import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Answer from './Answer.jsx';
import AppContext from '../../index.jsx';
import {QuestionsContext} from './QuestionsAnswers.jsx';

function AnswersList(props) {
  const [answers, setAnswers] = useState({});
  const [renderAnswers, setrenderAnswers] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const darkMode = useContext(AppContext);
  const postInt = useContext(QuestionsContext);

  useEffect(() => {
    //console.log(answers);
    //debugger;
    var answersArr = [];
    var sortedList = Object.keys(answers).map((key) => [key, answers[key]]);
    //console.log(result, 'result');
    sortedList.sort((a, b) => b[1].helpfulness - a[1].helpfulness);
    //console.log(sortedList, 'sort');
    for (var i = 0; i < sortedList.length; i++) {
      answersArr.push(<Answer item={sortedList[i][1]} keyvalue={i} />);
      if (isHidden && i === 1) {
        break;
      }
    }
    setrenderAnswers(answersArr);
  }, [answers, isHidden])

  useEffect(() => {
    setAnswers(props.data);
  }, [isHidden, props.data]);

  if (answers === []) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  var buttonStyle = {};
  if (darkMode) {
    buttonStyle['background-color'] = 'gold';
    buttonStyle['border'] = '4px solid black';
  }

  if (Object.keys(answers).length <= 2 || !isHidden) {
    //debugger;
    //console.log(renderAnswers);
    return (
      <div className="answerslist">
        <div>
          {renderAnswers}
        </div>
      </div>
    );
  } else {
    return (
      <div className="answerslist">
        <div>
          {renderAnswers}
        </div>
        <div>
          <button style={buttonStyle} className="moreanswers" onClick={(e) => { setIsHidden(false); postInt.handlePost(e) }}>More answers</button>
        </div>
      </div>
    )
  }
}


export default AnswersList;