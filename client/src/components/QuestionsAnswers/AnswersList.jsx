import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Answer from './Answer.jsx';

function AnswersList(props) {
  const [answers, setAnswers] = useState({});
  const [renderAnswers, setrenderAnswers] = useState([]);
  const [isHidden, setIsHidden] = useState(true);


  useEffect(() => {
    //console.log(answers);
    //debugger;
    var answersArr = [];
    var sortedList = Object.keys(answers).map((key) => [key, answers[key]]);
    //console.log(result, 'result');
    sortedList.sort((a, b) => b[1].helpfulness - a[1].helpfulness);
    //console.log(sortedList, 'sort');
    for (var i = 0; i < sortedList.length; i++) {
      answersArr.push(<Answer item={sortedList[i][1]} />);
      if (isHidden && i === 1) {
        break;
      }
    }
    setrenderAnswers(answersArr);
  }, [answers, isHidden])

  useEffect(() => {
    //debugger;
    //setList(props.data);
    //console.log(list, 'list')
    setAnswers(props.data);
    // var answersArr = [];
    // var sortedList = Object.keys(answers).map((key) => [key, answers[key]]);
    // //console.log(result, 'result');
    // sortedList.sort((a, b) => b[1].helpfulness - a[1].helpfulness);
    // //console.log(sortedList, 'sort');
    // for (var i = 0; i < sortedList.length; i++) {
    //   answersArr.push(<Answer item={sortedList[i][1]} />);
    //   if (isHidden && i === 1) {
    //     break;
    //   }
    // }
    // // var list_keys = Object.keys(list);
    // // var arr = [];
    // // for (var i = 0; i < list_keys.length; i++) {
    // //   //debugger;
    // //   //console.log(list[list_keys[i]]);
    // //   arr.push(<Answer item={list[list_keys[i]]} />);
    // //   if (isHidden && i === 1) {
    // //     break;
    // //   }
    // // }
    // setrenderAnswers(answersArr);
    //console.log(renderAnswers, 'render');
    //onclick toggel ishidden
  }, [isHidden, props.data]);

  if (answers === []) {
    return (
      <div>
        Loading...
      </div>
    )
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
    //debugger;
    return (
      <div className="answerslist">
        <div>
          {renderAnswers}
        </div>
        <div>
          <button onClick={() => setIsHidden(false)}>More answers</button>
        </div>
      </div>
    )
  }
}


export default AnswersList;