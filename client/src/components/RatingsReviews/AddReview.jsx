import React, { useState, useEffect ,useContext} from 'react';
import Modal from '../Modal.jsx';
import StarRating from "./StarRating.jsx";
import './AddReview.css';
import "./ReviewList.css";
import axios from 'axios';
import AppContext from "../../index.jsx";
export default function AddReview(props) {
  const [showModal, setShowModal] = useState(false);
  const [charKeys, setCharKeys] = useState([]);
  const [state, setState] = useState({
    rating: 0,
    recommend: true,
    characteristics: {},
    question: "",
    summary: '',
    body: '',
    photos: '',
    email: '',
    name: ''

  });
  const darkMode = useContext(AppContext);
  const characteristicsWords = {
    Size: ["A size too small", "½ a size too small", "Perfect", "½ a size too big", "A size too big"],
    Width: ["Too narrow", "Slightly narrow", "Perfect", "Slightly wide", "Too wide"],
    Comfort: ["Uncomfortable", "Slightly uncomfortable", "Ok", "Comfortable", "Perfect"],
    Quality: ["Poor", "Below average", "What I expected", "Pretty great", "Perfect"],
    Length: ["Runs short", "Runs slightly short", "Perfect", "Runs slightly long", "Runs long"],
    Fit: ["Runs tight", "Runs slightly tight", "Perfect", "Runs slightly loose", "Runs loose"]
  }
  useEffect(() => {
    setCharKeys(Object.keys(props.characteristics));
  }, [props.characteristics])
  const openModal = () => { setShowModal(true) };
  const toggleModal = () => { setShowModal(!showModal) };
  const closeModal = () => { setShowModal(false) };

  const handleChange = (e) => {
    //const value = e.target.value;
    if (e.target.name === "recommend") {
      let radioboolean = (e.target.value === "true");
      console.log({[e.target.name]: radioboolean});
      setState({
        ...state,
        [e.target.name]: radioboolean
      });

    } else{
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }
}
  const handleCharChange = (e) => {
    setState({
      ...state,
      characteristics: {
        ...state.characteristics,
        [props.characteristics[e.target.name].id]:+e.target.value
      }
    })
  }

  const handleStar = (value) => {
    setState({
      ...state,
      rating: value
    })
  }
  const handleSubmit = () => {
    if (!state.email || !state.name || !state.rating || !state.body) {
      //debugger;
      alert('One or more fields left empty');
      return;
    }
    if (Object.keys(state.characteristics).length !== Object.keys(props.characteristics).length) {
      alert("Please select all characteristics");
      return;
    }
    const test = /^\S+@\S+\.\S{3}$/;
    if (!state.email.match(test)) {
      alert('Please enter a valid email');
      return;
    }
    const obj = {
      product_id: props.product_id,
      rating: state.rating,
      recommend: state.recommend,
      characteristics: state.characteristics,
      summary: state.summary,
      body: state.body,
      email: state.email,
      name: state.name,
      photos: state.photos.split('\n').slice(0, 5)

    }
    console.log(obj);

    axios.post("http://localhost:3000/reviews", obj).then((response) => {
      //console.log(response);
    });
    closeModal();
    setState({
      rating: 0,
      recommend: true,
      characteristics: {},
      question: "",
      summary: '',
      body: '',
      photos: '',
      email: '',
      name: ''
    });
  }
  // console.log("from add review", props.characteristics)

  return (
    <div className="addReview">
      <button id="addReview" className={darkMode?"darkModeBtn":"lightModeBtn"} onClick={toggleModal}>ADD REVIEW+</button>
      {showModal ? <Modal handleClose={closeModal}  content={
        <div className="lightForm modalContainer">
          <h2 id="modalTitle" >WRITE YOUR REVIEW</h2>
          <form id="addReviewModal" >
            <div>Rating</div><StarRating handleStar={handleStar} />
            <div className="recommendRow">
              <label id="recomend">Do you recommend this product?</label><label>Yes<input type="radio" id="recommendRadioTrue" value={true} name="recommend" onChange={handleChange}/></label><label>No<input type="radio" id="recommendRadioFalse" value={false} name="recommend" onChange={handleChange} /></label>
            </div>
            <div className="characteristics">
              {
                charKeys.map((charkey) => {
                  return <div className="charRow" key={charkey}>
                    <label className="charElement charTitle">{charkey}</label>
                    <label className="charElement"><input type="radio" value={1} name={charkey} onChange={handleCharChange} />{characteristicsWords[charkey][0]}</label>
                    <label className="charElement"><input type="radio" value={2} name={charkey} onChange={handleCharChange} />{characteristicsWords[charkey][1]}</label>
                    <label className="charElement"><input type="radio" value={3} name={charkey} onChange={handleCharChange} />{characteristicsWords[charkey][2]}</label>
                    <label className="charElement"><input type="radio" value={4} name={charkey} onChange={handleCharChange} />{characteristicsWords[charkey][3]}</label>
                    <label className="charElement"><input type="radio" value={5} name={charkey} onChange={handleCharChange} />{characteristicsWords[charkey][4]}</label>
                  </div>
                })
              }


            </div>
            <label>Review title</label>
            <input type="text" size="50" value={state.summary} name="summary" placeholder="Write your review title here." onChange={handleChange}></input>

            <label>Review content:</label>
            <textarea value={state.body} name="body" placeholder="Write your review here." rows={3} cols={80} onChange={handleChange}>
              </textarea>
            <label>Your photos:
              <textarea value={state.photos} name="photos" onChange={handleChange} rows={5} cols={80} placeholder="Add your photo url here" /></label>

            <label>What is your nickname? </label>
            <input type="text" value={state.name} name="name" placeholder="Example: jackson11!" onChange={handleChange}></input>
            <label>What is your email?</label>
            <input id="email" type="text" value={state.email} name="email" placeholder="Example: jackson11@gmail.com " onChange={handleChange}></input>


         <button id="submitBtn" className="lightModeBtn" type="submit" onClick={handleSubmit}>Submit</button>
          </form>

        </div>

      } /> : null}


    </div>
  )
}