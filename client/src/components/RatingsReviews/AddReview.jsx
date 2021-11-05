import React, { useState, useEffect } from 'react';
import Modal from '../Modal.jsx';
import StarRating from "./StarRating.jsx";
import AddReviewphoto from "./AddReviewphoto.jsx";
import './AddReview.css';
import {characteristicsWords} from "./ProductBreakdownList.jsx";
import axios from 'axios';
export default function AddReview(props) {
  const [showModal, setShowModal] = useState(false);
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

  })
  const openModal = () => { setShowModal(true) };
  const toggleModal = () => { setShowModal(!showModal) };
  const closeModal = () => { setShowModal(false) };
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
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
      if(Object.keys(state.characteristics).length!==Object.keys(props.characteristics).length){
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
      //console.log(obj);

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
      <button id="addReview" onClick={toggleModal}>ADD REVIEW+</button>
      {showModal ? <Modal handleClose={closeModal} content={
        <>
          <h2>WRITE YOUR REVIEW</h2>
          <form>
            <div>Rating</div><StarRating handleStar={handleStar} />
            <label id="recomend">Do you recommend this product?<label>Yes</label><input type="radio" id="recommendRadioTrue" value={true} name="recommend" /><label>No</label><input type="radio" id="recommendRadioFalse" value={false} name="recommend" /> </label>
            <div className="characteristics">
              {}
              <label>size</label>
              <label><input type="radio" value="none" name="size" />A size too small</label>
              <label><input type="radio" value="none" name="size" />½ a size too small</label>
              <label><input type="radio" value="none" name="size" />Perfect</label>
              <label><input type="radio" value="none" name="size" />½ a size too big</label>
              <label><input type="radio" value="none" name="size" />A size too wide</label>
            </div>
            <label>Review title
              <input type="text" value={state.summary} name="summary" placeholder="Write your review title here." onChange={handleChange}></input>
            </label>
            <label>Review
              <input type="text" value={state.body} name="body" placeholder="Write your review here." onChange={handleChange}>
              </input></label>
            <label>Your photos:<textarea value={state.photos} name="photos" onChange={handleChange} rows={5} cols={40} /></label>

            <label>What is your nickname?
              <input type="text" value={state.name} name="name" placeholder="Example: jackson11!" onChange={handleChange}></input></label>
            <label>What is your email?
              <input type="text" value={state.email} name="email" placeholder="Example: jackson11@gmail.com" onChange={handleChange}></input></label>
            {/* <label>Your photos:<textarea value={state.photos} name="photos" onChange={handleChange} rows={5} cols={40} /></label>
              <span>Please enter your photo links for every new line (max 5)</span> */}
            <AddReviewphoto />
          </form>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </>

      } /> : null}


    </div>
  )
}