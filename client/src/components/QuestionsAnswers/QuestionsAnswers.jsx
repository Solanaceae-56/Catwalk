import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import QuestionsList from './QuestionsList.jsx';
import AppContext from '../../index.jsx';
import Modal from '../Modal.jsx';
const axios = require('axios');
const config = require('../../../../config.js');
export const QuestionsContext = createContext();
export const FailedSearchContext = createContext({
  search: '',
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
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = React.useState({
    // searchString: "",
    nickname: "",
    email: "",
    question: "",
  })
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

  function handleChange(e) {
    //debugger;
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
    //console.log(state.searchString);
    //console.log(state.question);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  function submit() {
    debugger;
    //console.log(props.id);
    if (!state.email || !state.nickname || !state.question) {
      //debugger;
      alert('One or more fields left empty');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S{3}$/;
    if (!state.email.match(emailRegex)) {
      alert('Please enter a valid email');
      return;
    }
    const postObj = {
      productId: Number(props.id),
      email: state.email,
      name: state.nickname,
      body: state.question,
    }
    //console.log(postObj);
    //console.log(obj);
    axios.post("/qa/questions/", postObj).then((response) => {
      //console.log(response);
    });
    closeModal();
    setState({
      ...state,
      ['email']: '',
      ['nickname']: '',
      ['question']: '',
    });
  }

  var buttonStyle = {};
  if (darkMode) {
    buttonStyle['backgroundColor'] = 'rgb(100, 232, 241)';
    buttonStyle['border'] = '1px solid black';
  }


  return (
    <QuestionsContext.Provider value={clickObj}>
      <div className="questionmodule">
        <h1>Questions and Answers</h1>
        <FailedSearchContext.Provider value={{search, setSearch}}>
        <QuestionsList questions={questions} name={productName} id={productId} morequestions={moreQuestions} />
        </FailedSearchContext.Provider>
        <button className="askquestion" style={buttonStyle} onClick={(e) => { toggleModal(); handlePost(e) }}>Ask a Question</button>
        {isOpen && <Modal content={
          <>
            <h1 className="header">Ask your question</h1>
            <h2 className="header">about the {productName}</h2>
            <form id="askQuestionModal">
              <label>What is your question?<textarea value={state.question} name="question" onChange={handleChange} rows={4} cols={40} /></label>
              <label>What is your nickname?<input type="text" value={state.nickname} name="nickname" placeholder="Example: jackson11!" onChange={handleChange}></input></label>
              <span>For privacy reasons, do not use your full name or email address</span>
              <label>What is your email?
                <input type="text" value={state.email} name="email" placeholder="Why did you like the product or not?" onChange={handleChange}></input></label>
              <span>For authentication reasons, you will not be emailed.</span>
            </form>
            <button id="submitquestion" onClick={(e) => { submit(); handlePost(e) }}>Submit</button>
          </>} handleClose={toggleModal} />}
        <button style={buttonStyle} className="morequestions" onClick={(e) => { increaseCount(); handlePost(e) }}>More questions</button>
      </div>
    </QuestionsContext.Provider>
  );


}

export default QuestionsAnswers;