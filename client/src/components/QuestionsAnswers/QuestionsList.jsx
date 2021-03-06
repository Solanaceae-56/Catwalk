import React, { useState, useEffect, useContext, createContext } from 'react';
import Question from './Question.jsx';
import Modal from '../Modal.jsx';
import AppContext from '../../index.jsx'
import { QuestionsContext } from './QuestionsAnswers.jsx';
import {FailedSearchContext} from './QuestionsAnswers.jsx';

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
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [state, setState] = React.useState({
    searchString: "",
  })
  const [data, setData] = useState([]);
  const darkMode = useContext(AppContext);
  const postInt = useContext(QuestionsContext);
  const {search} = useContext(FailedSearchContext);

  useEffect(() => {
    setProductName(props.name);
  }, [props]);

  useEffect(() => {
    setData(props.questions);
  }, [props.questions]);

  var questions = [];

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
      productId: props.id,
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
    questions.push(<Question data={sortedQuestions[i]} name={props.name} search={state.searchString} keyvalue={i} key={i}/>);
    if (search === true) {
      break;
    }
  }

  if (questions.length === 0) {
    return (
      <div className="questionslist">
        <div>
          There are no questions for this product.
        </div>
      </div>
    )
  }

  return (
    <div className="questionslist">
      <input type="text" id="search" name="searchString" onChange={handleChange} value={state.searchString} placeholder="Have a question? Search for answers..."></input>
      <div>
        <div className="questions">
          {questions}
        </div>
      </div>
    </div>
  )
};

export default QuestionsList;