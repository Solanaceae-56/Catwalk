import React, { useState, useEffect, useContext } from 'react';
import Question from './Question.jsx';
import Modal from '../Modal.jsx';
import AppContext from '../../index.jsx'
const axios = require('axios');


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function QuestionsList(props) {
  //const [list, setList] = useState([]);
  //const [searchString, setSearchString] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  //const [modalIsOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [state, setState] = React.useState({
    searchString: "",
    nickname: "",
    email: "",
    question: "",
  })
  const [data, setData] = useState([]);
  //Modal.setAppElement('#app');

  useEffect(() => {
    setProductName(props.name);
  }, [props]);

  useEffect(() => {
    setData(props.questions);
  }, [props.questions]);

  var questions = [];

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
    //debugger;
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
      productId: props.id,
      email: state.email,
      name: state.nickname,
      body: state.question,
    }
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

  //console.log(props.answers, 'questionslist');
  //console.log(props.questions, 'inquestions');
  var sortedQuestions;
  if (data === []) {
    sortedQuestions = data;
  } else {
    sortedQuestions = data.sort((a, b) => b['question_helpfulness'] - a['question_helpfulness']);
  }
  for (var i = 0; i < sortedQuestions.length; i++) {
    if (i === props.morequestions) {
      break;
    }
    questions.push(<Question data={sortedQuestions[i]} name={props.name} search={state.searchString} keyvalue={i} />);
  }


  const darkmode = useContext(AppContext);
  //console.log(testvalue, 'testing');

  var buttonStyle = {};
  if (darkmode) {
    buttonStyle['background-color'] = 'gold';
    buttonStyle['border'] = '4px solid black';
  }

  if (questions.length === 0) {
    return (
      <div>
        <div>
          There are no questions for this product.
        </div>
        <button className="askquestion" style={buttonStyle} onClick={toggleModal}>Ask a Question</button>
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
            <button onClick={submit}>Submit</button>
          </>} handleClose={toggleModal} />}
      </div>
    )
  }

  return (
    <div>
      <input type="text" id="search" name="searchString" onChange={handleChange} value={state.searchString} placeholder="Have a question? Search for answers..."></input>
      <div>
        <button className="askquestion" style={buttonStyle} onClick={toggleModal}>Ask a Question</button>
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
            <button onClick={submit}>Submit</button>
          </>} handleClose={toggleModal} />}
        <div className="questions">
          {questions}
        </div>
      </div>
    </div>
  )
};

export default QuestionsList;