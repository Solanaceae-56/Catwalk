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
    var answersArr = [];
    var sortedList = Object.keys(answers).map((key) => [key, answers[key]]);
    //console.log(result, 'result');
    sortedList.sort((a, b) => b[1].helpfulness - a[1].helpfulness);
    for (var i = 0; i < sortedList.length; i++) {
      answersArr.push(<Answer item={sortedList[i][1]} keyvalue={i} key={i}/>);
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

  var answersClass = "moreanswers"
  if (darkMode) {
    answersClass = "moreanswers-dark";
  }

  if (Object.keys(answers).length <= 2 || !isHidden) {
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
          <button className={answersClass} onClick={(e) => { setIsHidden(false); postInt.handlePost(e) }}>More answers</button>
        </div>
      </div>
    )
  }
}


export default AnswersList;