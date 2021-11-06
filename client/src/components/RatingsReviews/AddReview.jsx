import React, { useState, useEffect } from 'react';
import Modal from '../Modal.jsx';
import StarRating from "./StarRating.jsx";
import './AddReview.css';
export default function AddReview(props) {
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState({
    rating: 0,
    recommend: true,
    Characteristics: {},
    question: "",
    summary:'',
    body:'',
    photos:[],
    email:'',
    name:''

  })
  const openModal = () => { setShowModal(true) };
  const toggleModal = () => { setShowModal(!showModal) };
  const closeModal = () => { setShowModal(false) };
  const handleChange = (e)=>{
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }
  const handleStar =(value)=>{
    setState({
      ...state,
      rating:value
    })
  }
console.log("add")
  return (
    <div className="addReview">
      <button id="addReview" onClick={toggleModal}>ADD REVIEW+</button>
      {showModal ? <Modal handleClose={closeModal} content={
         <>
         <h2>WRITE YOUR REVIEW</h2>
         <form>
           <div>Rating</div><StarRating handleStar={handleStar}/>
           <label id="recomend">Do you recommend this product?<label>Yes</label><input type="radio" id="recommendRadioTrue" value={true} name="recommend"/><label>No</label><input type="radio" id="recommendRadioFalse" value={false} name="recommend"/> </label>
           <div className="characteristics">
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
          </input>
          <button>add photo</button>
          </label>
          <label>What is your nickname?
            <input type="text" value={state.name} name="name" placeholder="Example: jackson11!" onChange={handleChange}></input></label>
          <label>What is your email?
            <input type="text" value={state.email} name="email" placeholder="Example: jackson11@gmail.com" onChange={handleChange}></input></label>


           {/* <label>What is your nickname?<input type="text" value={state.nickname} name="nickname" placeholder="Example: jackson11!" onChange={handleChange}></input></label>
           <span>For privacy reasons, do not use your full name or email address</span>
           <label>What is your email?
           <input type="text" value={state.email} name="email" placeholder="Why did you like the product or not?" onChange={handleChange}></input></label>
           <span>For authentication reasons, you will not be emailed.</span> */}
         </form>
         <button >Submit</button>
       </>

      }/> : null}


    </div>
  )
}