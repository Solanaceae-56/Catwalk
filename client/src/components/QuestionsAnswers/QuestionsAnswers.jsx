import React, { useState, useEffect , useRef} from 'react';
import QuestionsList from './QuestionsList.jsx';
const axios = require('axios');
const config = require('../../../../config.js');

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function QuestionsAnswers(props) {
  const [questions, setQuestions] = useState([]);
  const [productId, setProductId] = useState(0);
  const [count, setCount] = useState(15);
  const [moreQuestions, setMoreQuestions] = useState(2);
  const prevquestions = usePrevious(questions);
  const [productName, setProductName] = useState(props.productName);
  //console.log(props.productName);

  useEffect(() => {
    setProductId(props.id);
    setProductName(props.productName);
    //console.log('test');
  }, [props]);

  useEffect(() => {
    axios.get("/qa/questions", { params: { productId: productId, count: count } }).then((response) => {
      //console.log(response);
      //console.log(response.data, 'what');
      setQuestions(response.data.results);
      //console.log(questions, 'yo');
    });
    // axios.get("http://localhost:3000/qa/questions", {params: {path: '/answers', questionId: 329015}}).then((response) => {
    //   //console.log(response.data);  //move this to answerlist??
    //   setAnswers(response.data.results);
    //   //console.log(answers, 'yo');
    // });
  }, [count, productId]);

  function increaseCount() {
    setCount(count + 4);
    setMoreQuestions(moreQuestions + 2);
    //console.log(count);
  }

  return (
    <div>
      <div>Questions and Answers</div>
      <QuestionsList questions={questions} name={productName} id={productId} morequestions={moreQuestions} />
      <button onClick={increaseCount}>More questions</button>
    </div>
  );


}

export default QuestionsAnswers;