import React, { useState, useEffect } from 'react';
import QuestionsList from './QuestionsList.jsx';
const axios = require('axios');
const config = require('../../../../config.js');

function QuestionsAnswers (props) {
  const [questions, setQuestions] = useState([]);
  const [question_Id, setQuestionId] = useState('');
  const [answers, setAnswers] = useState([]);
  const [product_Id, setProductId] = useState('');
  const [count, setCount] = useState(5);
  //const [productName, setProductName] = useState(props.productName);
  //console.log(props.productName);
  useEffect( () => {
    // axios.get("http://localhost:3000/qa/questions", {params: {productId: props.productid}}).then((response) => {
    //   console.log(response);
    //   setList(response);
    // });

    /*setProductId(props.productId)*/
    /* use state product id instead below*/
    axios.get("http://localhost:3000/qa/questions", {params: {productId: 40346, count: count}}).then((response) => {
      //console.log(response);
      console.log(response.data, 'what');
      setQuestions(response.data.results);
      //console.log(questions, 'yo');
    });
    // axios.get("http://localhost:3000/qa/questions", {params: {path: '/answers', questionId: 329015}}).then((response) => {
    //   //console.log(response.data);  //move this to answerlist??
    //   setAnswers(response.data.results);
    //   //console.log(answers, 'yo');
    // });
  }, [count]);

  function increaseCount () {
    setCount(count + 2);
    console.log(count);
  }
  return (
    <div>
      <div>Questions and Answers</div>
      <QuestionsList questions={questions} name={props.productName} id={props.id}/>
      <button onClick={increaseCount}>More questions</button>
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