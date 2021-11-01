import React, { useState, useEffect } from 'react';
import QuestionsList from './QuestionsList.jsx';
const axios = require('axios');
const config = require('../../../../config.js');

function QuestionsAnswers (props) {
  const [questions, setQuestions] = useState([]);
  const [question_Id, setQuestionId] = useState('');
  const [answers, setAnswers] = useState([]);
  useEffect( () => {
    // axios.get("http://localhost:3000/qa/questions", {params: {productId: props.productid}}).then((response) => {
    //   console.log(response);
    //   setList(response);
    // });
    axios.get("http://localhost:3000/qa/questions", {params: {productId: 40344}}).then((response) => {
      //console.log(response);
      console.log(response.data);
      setQuestions(response.data.results);
      //console.log(questions, 'yo');
    });
    axios.get("http://localhost:3000/qa/questions", {params: {path: '/answers', questionId: 426460}}).then((response) => {
      //console.log(response.data);  //move this to answerlist??
      setAnswers(response.data.results);
      //console.log(answers, 'yo');
    });
  }, []);

  return (
    <div>
      <div>Questions and Answers</div>
      <QuestionsList questions={questions} answers={answers}/>
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