import React, { useState, useEffect, useContext } from 'react';
import {GoThumbsup, GoReport} from 'react-icons/go';
import moment from 'moment';
import AnswersList from './AnswersList.jsx';
import Modal from '../Modal.jsx';
import AppContext from '../../index.jsx';
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

  function handleHelpful(e) {
    debugger;
    //console.log(e.target.parentNode.id)
    var putPath = 'helpfulquestion';
    console.log(putPath);
    var qId = props.data['question_id'];
    //console.log(typeof (qId), qId);
    console.log(props.data['question_id']);
    axios.put("/qa/questions/put", { path: putPath, questionId: qId }).then((response) => {
      //console.log(response);
      if (putPath === 'helpfulquestion') {
        setHelpful(helpful + 1);
      }
    });
    setDisable(true);
  }

  function handleReport(e) {
    debugger;
    //console.log(e.target.parentNode.id)
    var putPath = 'reportquestion';
    console.log(putPath);
    var qId = props.data['question_id'];
    //console.log(typeof (qId), qId);
    console.log(props.data['question_id']);
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
    "textAlign": 'right'
  }
  const textleft = {
    "textAlign": 'left',
  }

  const darkmode = useContext(AppContext);

  var buttonStyle = {};
  if (darkmode) {
    buttonStyle['background-color'] = 'gold';
    buttonStyle['border'] = '4px solid black';
  }

  if (props.search.length < 3) {
    return (
      <div>
        <div className='question' key={props.keyvalue}>
          <table style={tablestyle}>
            <thead>
            <tr>
              <td style={textleft}>Q: {props.data['question_body']}</td>
              <td style={textright} id={props.data['question_id']}>Helpful? <button style={buttonStyle} id='helpfulquestion' className="helpfulBtn" disabled={disable} onClick={handleHelpful}><GoThumbsup /></button><span> ({helpful}) | </span> <button id='reportquestion' style={buttonStyle} className="helpfulBtn" disabled={disable} onClick={handleReport}><GoReport/></button> <button style={buttonStyle} onClick={openModal} className="addanswer">Add an Answer!</button></td>
            </tr>
            </thead>
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
              <h1 className="header">Submit your Answer</h1>
              <h2 className="header">{props.name}: {props.data['question_body']}</h2>
              <div className="modal"></div>
              <form id="addAnswerModal">
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
        <div className='question' key={props.keyvalue}>
          <table style={tablestyle}>
            <tr>
              <td style={textleft}>Q: {props.data['question_body']}</td>
              <td style={textright} id={props.data['question_id']}>Helpful? <button style={buttonStyle} id='helpfulquestion' className="helpfulBtn" disabled={disable} onClick={handleHelpful}><GoThumbsup /></button><span> ({helpful}) | </span> <button style={buttonStyle} id='reportquestion' className="helpfulBtn" disabled={disable} onClick={handleReport}><GoReport/></button> <button style={buttonStyle} onClick={openModal}>Add an Answer!</button></td>
            </tr>
          </table>
        </div>
        <button onClick={openModal}>Add an Answer</button>
        {isOpen && <Modal content={
          <>
            <h1 className="header">Submit your Answer</h1>
            <h2 className="header">{props.name}: {props.data['question_body']}</h2>
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