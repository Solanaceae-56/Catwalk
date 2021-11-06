import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
//import Modal from 'react-modal';
const axios = require('axios');
import Modal from '../Modal.jsx';

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
  //let subtitle;
  //const [list, setList] = useState([]);
  //const [searchString, setSearchString] = useState('')
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  //const [modalIsOpen, setIsOpen] = useState(false);
  const [state, setState] = React.useState({
    searchString: "",
    nickname: "",
    email: "",
    question: "",
  })
  //Modal.setAppElement('#app');

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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log('in modal');
  }

  function closeModal() {
    setIsOpen(false);
  }


  function submit() {
    //debugger;
    //console.log(props.id);
    if (!state.email || !state.nickname || !state.question) {
      //debugger;
      alert('One or more fields left empty');

      return;
    }
    const test = /^\S+@\S+\.\S{3}$/;
    if (!state.email.match(test)) {
      alert('Please enter a valid email');
      return;
    }
    const obj = {
      productId: props.id,
      email: state.email,
      name: state.nickname,
      body: state.question,
    }
    //console.log(obj);
    axios.post("http://localhost:3000/qa/questions/", obj).then((response) => {
      console.log(response);
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
  console.log(props.questions, 'inquestions');
  var sortedQuestions = props.questions.sort((a, b) => b['question_helpfulness'] - a['question_helpfulness']);
  for (var i = 0; i < sortedQuestions.length; i++) {
    if (i === props.morequestions) {
      break;
    }
    questions.push(<Question data={sortedQuestions[i]} name={props.name} search={state.searchString} />);
  }

  if (questions.length === 0) {
    return (
      <div>
        <div>
          There are no questions for this product.
        </div>
        <button onClick={openModal}>Ask a question!</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={toggleModal}>Ask a Question</button>
      {isOpen && <Modal content={
        <>
        <h2>Hello Modal</h2>
        <form>
          <label>What is your question?<textarea value={state.question} name="question" onChange={handleChange} rows={4}cols={40}/></label>
          <label>What is your nickname?<input type="text" value={state.nickname} name="nickname" placeholder="Example: jackson11!" onChange={handleChange}></input></label>
          <span>For privacy reasons, do not use your full name or email address</span>
          <label>What is your email?
          <input type="text" value={state.email} name="email" placeholder="Why did you like the product or not?" onChange={handleChange}></input></label>
          <span>For authentication reasons, you will not be emailed.</span>
        </form>
        <button onClick={submit}>Submit</button>
      </>} handleClose={toggleModal} />}


      {/* <h2>Hello Modal</h2>
        <form>
          <label>What is your question?<textarea value={state.question} name="question" onChange={handleChange} /></label>
          <label>What is your nickname?<input type="text" value={state.nickname} name="nickname" placeholder="Example: jackson11!" onChange={handleChange}></input></label>
          <span>For privacy reasons, do not use your full name or email address</span>
          <label>What is your email?
          <input type="text" value={state.email} name="email" placeholder="Why did you like the product or not?" onChange={handleChange}></input></label>
          <span>For authentication reasons, you will not be emailed.</span>
        </form>
        <button onClick={submit}>Submit</button> */}

      {/* <button onClick={openModal}>Ask a question!</button>
      <Modal>
        <h1>Ask your question</h1>
        <h2>about the {props.name}</h2>
        <div className="modal"></div>
        <form>
          <label>What is your question?<textarea value={state.question} name="question" onChange={handleChange} /></label>
          <label>What is your nickname?<input type="text" value={state.nickname} name="nickname" placeholder="Example: jackson11!" onChange={handleChange}></input></label>
          <span>For privacy reasons, do not use your full name or email address</span>
          <label>What is your email?
          <input type="text" value={state.email} name="email" placeholder="Why did you like the product or not?" onChange={handleChange}></input></label>
          <span>For authentication reasons, you will not be emailed.</span>
        </form>
        <button onClick={submit}>Submit</button>
      </Modal> */}
      <input type="text" id="search" name="searchString" onChange={handleChange} value={state.searchString} placeholder="Have a question? Search for answers..."></input>
      <div className="questions">
        {questions}
      </div>
    </div>
  )
};

export default QuestionsList;