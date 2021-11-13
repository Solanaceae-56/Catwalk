import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import QuestionsList from './QuestionsList.jsx';
import AppContext from '../../index.jsx';
import Modal from '../Modal.jsx';
const axios = require('axios');
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
      setQuestions(response.data.results);
    });
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
    var date = Date();
    axios.post("/interactions", { params: { element: targetElement, time: date, widget: clickObj['widget'] } })
      .then((data) => {
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
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
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
    if (!state.email || !state.nickname || !state.question) {
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
    axios.post("/qa/questions/", postObj).then((response) => {
    });
    closeModal();
    setState({
      ...state,
      ['email']: '',
      ['nickname']: '',
      ['question']: '',
    });
  }

  var questionClass = "morequestions";
  var answerClass = "askquestion"
  if (darkMode) {
    questionClass = "morequestions-dark"
    answerClass = "askquestion-dark"
  }


  return (
    <QuestionsContext.Provider value={clickObj}>
      <div className="questionmodule">
        <h1>Questions and Answers</h1>
        <FailedSearchContext.Provider value={{search, setSearch}}>
        <QuestionsList questions={questions} name={productName} id={productId} morequestions={moreQuestions} />
        </FailedSearchContext.Provider>
        <button className={answerClass} onClick={(e) => { toggleModal(); handlePost(e) }}>Ask a Question</button>
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
            <button id="submitquestion" className={answerClass} onClick={(e) => { submit(); handlePost(e) }}>Submit</button>
          </>} handleClose={toggleModal} />}
        <button className={questionClass} onClick={(e) => { increaseCount(); handlePost(e) }}>More questions</button>
      </div>
    </QuestionsContext.Provider>
  );


}

export default QuestionsAnswers;