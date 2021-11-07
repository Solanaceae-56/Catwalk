import React, { useState, useEffect } from 'react';
import moment from 'moment';
import AnswersList from './AnswersList.jsx';
import Modal from '../Modal.jsx';
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

function Question(props) {
  //console.log(props.data, 'data');
  //console.log(props.data.answers);
  //const [modalIsOpen, setIsOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [questionId, setQuestionId] = useState(props.data['question_id']);
  const [helpful, setHelpful] = useState(props.data['question_helpfulness']);
  const [state, setState] = React.useState({
    nickname: "",
    email: "",
    answer: "",
    photos: "",
  })



  useEffect(() => {
    setHelpful(props.data['question_helpfulness']);
  }, [props.data]);

  //Modal.setAppElement('#app');
  if (props.data.answers.length > 2) {
    //
  }

  function click(e) {
    debugger;
    //console.log(e.target.id);
    //console.log(e.target.parentNode.id)
    var putPath = e.target.id;
    var qId = Number(e.target.parentNode.id);
    //console.log(typeof (qId), qId);
    axios.put("/qa/questions/put", { path: putPath, questionId: qId }).then((response) => {
      //console.log(response);
      if (putPath === 'helpfulquestion') {
        setHelpful(helpful + 1);
      }
    });
    setDisable(true);
  }

  function handleChange(e) {
    //debugger;
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
    //console.log(state.searchString);
    //console.log(state.photos);
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

  function submit(e) {
    //debugger;
    //console.log(props.id);
    const postObj = {
      path: '/answers',
      questionId: questionId,
      email: state.email,
      name: state.nickname,
      body: state.answer,
      photos: state.photos.split('\n').slice(0, 5)
    }
    //console.log(obj);
    if (!state.email || !state.nickname || !state.answer) {
      //debugger;
      alert('One or more fields left empty');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S{3}$/;
    if (!state.email.match(emailRegex)) {
      alert('Please enter a valid email');
      return;
    }
    axios.post("/qa/questions/", postObj).then((response) => {
      //console.log(response);
    });
    closeModal();
    setState({
      ...state,
      ['email']: '',
      ['nickname']: '',
      ['answer']: '',
      ['photos']: '',
    });
  }

  const tablestyle = {
    width: "100%"
  }
  const textright = {
    "text-align": 'right'
  }
  const textleft = {
    "text-align": 'left',
    "padding-left": 0
  }

  if (props.search.length < 3) {
    return (
      <div>
        <div className='question'>
          <table style={tablestyle}>
            <tr>
              <td style={textleft}>Q: {props.data['question_body']}</td>
              <td style={textright} id={props.data['question_id']}>Helpful? <button id='helpfulquestion' disabled={disable} onClick={click}>Yes ({helpful})</button> <button id='reportquestion' disabled={disable} onClick={click}>Report</button> <button onClick={openModal}>Add an Answer!</button></td>
            </tr>
          </table>
        </div>
        {/* <div className='qbody'>Q: {props.data['question_body']}</div>
          <div className='misc'>
            <div className='help'>Helpful?</div>
            <div className='helpful' id='helpfulquestion' onClick={click}> Yes ({helpful})</div>
            <div className='report' id='reportquestion' onClick={click}>Report?</div>
          </div>
        </div> */}
        {/* <div className='addanswer' onClick={add}>Add Answer</div> */}
        {/* <button onClick={openModal}>Add an Answer</button> */}
        {
          isOpen && <Modal content={
            <>
              <h1>Submit your Answer</h1>
              <h2>{props.name}: {props.data['question_body']}</h2>
              <div className="modal"></div>
              <form>
                <label>Your answer:<textarea value={state.answer} name="answer" onChange={handleChange} maxLength="1000" rows={4} cols={40} /></label>
                <label>What is your nickname?<input type="text" value={state.nickname} name="nickname" placeholder="Example: jackson543!" onChange={handleChange} maxLength="60"></input></label>
                <span>For privacy reasons, do not use your full name or email address</span>
                <label>What is your email?
                  <input type="text" value={state.email} name="email" placeholder="Example: jack@email.com" onChange={handleChange} maxLength="60"></input></label>
                <span>For authentication reasons, you will not be emailed.</span>
                <label>Your photos:<textarea value={state.photos} name="photos" onChange={handleChange} rows={5} cols={40} /></label>
                <span>Please enter your photo links for every new line (max 5)</span>
              </form>
              <button onClick={submit}>Submit</button>
            </>} handleClose={toggleModal} />
        }
        <div className='answers'>
          <AnswersList data={props.data.answers} />
          {/* <div className='misc'>by {props.data.answers['answerer_name']}, {moment().format(date)}</div>
      <div className='misc'>Helpful? 'yes'</div>
      <div className='misc'>Add Answer</div> */}
        </div>
      </div >
    );
  } else if (props.search.length >= 3 && props.data['question_body'].toLowerCase().indexOf(props.search) !== -1) {
    return (
      <div>
        <div className='question'>
          <table style={tablestyle}>
            <tr>
              <td style={textleft}>Q: {props.data['question_body']}</td>
              <td style={textright} id={props.data['question_id']}>Helpful? <button id='helpfulquestion' disabled={disable} onClick={click}>Yes ({helpful})</button> <button id='reportquestion' disabled={disable} onClick={click}>Report</button> <button onClick={openModal}>Add an Answer!</button></td>
            </tr>
          </table>
        </div>
        <button onClick={openModal}>Add an Answer</button>
        {isOpen && <Modal content={
          <>
            <h1>Submit your Answer</h1>
            <h2>{props.name}: {props.data['question_body']}</h2>
            <div className="modal"></div>
            <form>
              <label>Your answer:<textarea value={state.answer} name="answer" onChange={handleChange} maxLength="1000" rows={4} cols={40} /></label>
              <label>What is your nickname?<input type="text" value={state.nickname} name="nickname" placeholder="Example: jackson543!" onChange={handleChange} maxLength="60"></input></label>
              <span>For privacy reasons, do not use your full name or email address</span>
              <label>What is your email?
                <input type="text" value={state.email} name="email" placeholder="Example: jack@email.com" onChange={handleChange} maxLength="60"></input></label>
              <span>For authentication reasons, you will not be emailed.</span>
              <label>Your photos:<textarea value={state.photos} name="photos" onChange={handleChange} rows={5} cols={40} /></label>
              <span>Please enter your photo links for every new line (max 5)</span>
            </form>
            <button onClick={submit}>Submit</button>
          </>} handleClose={toggleModal} />}
        <div className='answers'>
          <AnswersList data={props.data.answers} />
          {/* <div className='misc'>by {props.data.answers['answerer_name']}, {moment().format(date)}</div>
        <div className='misc'>Helpful? 'yes'</div>
        <div className='misc'>Add Answer</div> */}
        </div>
      </div>
    );
  }
  return (
    <div>
      No questions match search term!
    </div>
  )
};

export default Question;