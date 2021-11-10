import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import QuestionsList from './QuestionsList.jsx';
import AppContext from '../../index.jsx';
const axios = require('axios');
const config = require('../../../../config.js');
export const QuestionsContext = createContext();
export const FailedSearchContext = createContext({
  search: false,
  setSearch: (status) => {}
});
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function QuestionsAnswers(props) {
  const [search, setSearch] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [productId, setProductId] = useState(0);
  const [count, setCount] = useState(15);
  const [moreQuestions, setMoreQuestions] = useState(2);
  const [productName, setProductName] = useState(props.productName);
  const darkMode = useContext(AppContext);
  const prevquestions = usePrevious(questions);
  const clickObj = {
    widget: 'Questions and Answers',
    handlePost: handlePost.bind(this)
  }

  useEffect(() => {
    setProductId(props.id);
    setProductName(props.productName);
  }, [props]);

  useEffect(() => {
    axios.get("/qa/questions", { params: { productId: productId, count: count } }).then((response) => {
      //console.log(response.data);
      setQuestions(response.data.results);
    });
    // axios.get("http://localhost:3000/qa/questions", {params: {path: '/answers', questionId: 329015}}).then((response) => {
    //   //console.log(response.data);  //move this to answerlist??
    //   setAnswers(response.data.results);
    //   //console.log(answers, 'yo');
    // });
  }, [count, productId]);


  function handlePost(e) {
    var targetElement = e.target.id;
    var backup = e.target.className;
    if (typeof (backup) === 'object') {
      backup = e.currentTarget.className;
    }
    if (!targetElement) {
      targetElement = e.currentTarget.id;
    }
    if (!targetElement) {
      targetElement = backup;
    }
    //console.log(targetElement, 'targetelement');
    var date = Date();
    axios.post("/interactions", { params: { element: targetElement, time: date, widget: clickObj['widget'] } })
      .then((data) => {
        //console.log('posted to interactions');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function increaseCount() {
    setCount(count + 4);
    setMoreQuestions(moreQuestions + 2);
  }

  var buttonStyle = {};
  if (darkMode) {
    buttonStyle['background-color'] = 'gold';
    buttonStyle['border'] = '4px solid black';
  }


  return (
    <QuestionsContext.Provider value={clickObj}>
      <div>
        <h1>Questions and Answers</h1>
        <FailedSearchContext.Provider value={{search, setSearch}}>
        <QuestionsList questions={questions} name={productName} id={productId} morequestions={moreQuestions} />
        </FailedSearchContext.Provider>
        <button style={buttonStyle} className="morequestions" onClick={(e) => { increaseCount(); handlePost(e) }}>More questions</button>
      </div>
    </QuestionsContext.Provider>
  );


}

export default QuestionsAnswers;