import React, { useState, useEffect } from 'react';
import moment from 'moment';
import AnswersList from './AnswersList.jsx';
import Modal from 'react-modal';
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [questionId, setQuestionId] = useState(props.data['question_id']);
  const [helpful, setHelpful] = useState(props.data['question_helpfulness']);
  const [state, setState] = React.useState({
    nickname: "",
    email: "",
    answer: "",
    photos: "",
  })

  Modal.setAppElement('#app');
  if (props.data.answers.length > 2) {
    //
  }

  function click(e) {
    debugger;
    //console.log(e.target.id);
    //console.log(e.target.parentNode.id)
    var putPath = e.target.id;
    var qId = Number(e.target.parentNode.id);
    //console.log(typeof(qId), qId);
    axios.put("http://localhost:3000/qa/questions/put", { path: putPath, questionId: qId }).then((response) => {
      console.log(response);
      if (putPath === 'helpfulquestion') {
        setHelpful(helpful + 1);
      }
    });
  }




  function handleChange(e) {
    //debugger;
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
    //console.log(state.searchString);
    console.log(state.photos);
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


  function submit(e) {
    debugger;
    //console.log(props.id);
    const obj = {
      path: '/answers',
      questionId: questionId,
      email: state.email,
      name: state.nickname,
      body: state.answer,
      photos: state.photos.split('\n').slice(0, 5)
    }
    console.log(obj);
    if (!state.email || !state.nickname || !state.answer) {
      //debugger;
      alert('One or more fields left empty');
      return;
    }
    const test = /^\S+@\S+\.\S{3}$/;
    if (!state.email.match(test)) {
      alert('Please enter a valid email');
      return;
    }
    //debugger;
    //var qId = Number(e.target.parentNode.id);
    //console.log(qId);
    // const obj = {
    //   path: '/answers',
    //   questionId: questionId,
    //   email: state.email,
    //   name: state.nickname,
    //   body: state.answer,
    //   photos: state.photos
    // }
    // console.log(obj);
    axios.post("http://localhost:3000/qa/questions/", obj).then((response) => {
      console.log(response);
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

  if (props.search.length < 3) {
    return (
      <div>
        <div className='question' id={props.data['question_id']}>
          <div className='qbody'>Q: {props.data['question_body']}</div>
          <div className='help'>Helpful?</div>
          <div className='helpful' id='helpfulquestion' onClick={click}> Yes ({helpful})</div>
          <div className='report' id='reportquestion' onClick={click}>Report?
          </div>
        </div>
        {/* <div className='addanswer' onClick={add}>Add Answer</div> */}
        <button onClick={openModal}>Add an Answer</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Answer Modal"
          centered
        >
          <h1>Submit your Answer</h1>
          <h2>{props.name}: {props.data['question_body']}</h2>
          <div className="modal"></div>
          <form>
            <label>Your answer:<textarea value={state.answer} name="answer" onChange={handleChange} maxLength="1000" /></label>
            <label>What is your nickname?<input type="text" value={state.nickname} name="nickname" placeholder="Example: jackson543!" onChange={handleChange} maxLength="60"></input></label>
            <span>For privacy reasons, do not use your full name or email address</span>
            <label>What is your email?
              <input type="text" value={state.email} name="email" placeholder="Example: jack@email.com!" onChange={handleChange} maxLength="60"></input></label>
            <span>For authentication reasons, you will not be emailed.</span>
            <label>Your photos:<textarea value={state.photos} name="photos" onChange={handleChange} rows={5}/></label>
            <span>Please enter your photo links for every new line (max 5)</span>
            {/* <button></button> */}
            {/* <button>stays</button>
          <button>inside</button>
          <button>the modal</button> */}
          </form>
          <div className="photos">
            <button>Upload photos</button>
          </div>
          <button onClick={submit}>Submit</button>
        </Modal>
        <div className='answers'>
          <AnswersList data={props.data.answers} />
          {/* <div className='misc'>by {props.data.answers['answerer_name']}, {moment().format(date)}</div>
      <div className='misc'>Helpful? 'yes'</div>
      <div className='misc'>Add Answer</div> */}
        </div>
      </div>
    );
  } else if (props.search.length >= 3 && props.data['question_body'].toLowerCase().indexOf(props.search) !== -1) {
    return (
      <div>
        <div className='question' id={props.data['question_id']}>
          <div className='qbody'>Q: {props.data['question_body']}</div>
          <div className='help'>Helpful?</div>
          <div className='helpful' id='helpfulquestion' onClick={click}> Yes ({helpful})</div>
          <div className='report' id='reportquestion' onClick={click}>Report?
          </div>
          {/* <div className='addanswer'>Add Answer</div> */}
        </div>
        <button onClick={openModal}>Add an Answer</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Answer Modal"
          centered
        >
          <h1>Submit your Answer</h1>
          <h2>{props.name}: {props.data['question_body']}</h2>
          <div className="modal"></div>
          <form>
            <label>Your answer:<textarea value={state.answer} name="question" onChange={handleChange} maxLength="1000" /></label>
            <label>What is your nickname?<input type="text" value={state.nickname} name="nickname" placeholder="Example: jackson543!" onChange={handleChange} maxLength="60"></input></label>
            <span>For privacy reasons, do not use your full name or email address</span>
            <label>What is your email?
              <input type="text" value={state.email} name="jack@email.com" placeholder="Example: jackson11!" onChange={handleChange} maxLength="60"></input></label>
            <span>For authentication reasons, you will not be emailed.</span>
            <label>Your photos:<textarea value={state.photos} name="photos" onChange={handleChange} rows={5}/></label>
            <span>Please enter your photo links for every new line (max 5)</span>
            {/* <button></button> */}
            {/* <button>stays</button>
          <button>inside</button>
          <button>the modal</button> */}
          </form>
          <div className="photos">
            <button>Upload photos</button>
          </div>
          <button onClick={submit}>Submit</button>
        </Modal>
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
  // return (
  //   <div>
  //     <div className='question' id={props.data['question_id']}>
  //       <div className='qbody'>Q: {props.data['question_body']}</div>
  //       <div className='help'>Helpful?</div>
  //       <div className='helpful' id='helpfulquestion' onClick={click}> Yes ({props.data['question_helpfulness']})</div>
  //       <div className='report' id='reportquestion' onClick={click}>Report?
  //       </div>
  //     </div>
  //     <div className='answers'>
  //       <AnswersList data={props.data.answers} />
  //       {/* <div className='misc'>by {props.data.answers['answerer_name']}, {moment().format(date)}</div>
  //       <div className='misc'>Helpful? 'yes'</div>
  //       <div className='misc'>Add Answer</div> */}
  //     </div>
  //   </div>
  // );
};

export default Question;