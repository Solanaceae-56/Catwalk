import React, { useState, useEffect } from 'react';
import Modal from '../Modal.jsx';
export default function AddReviewphoto(props) {

  const [showAddphoto, setAddphoto] = useState(false);
  const openAddphoto = () => { setAddphoto(true) };
  const toggleAddphoto = () => { setAddphoto(!showAddphoto) };
  const closeAddphoto = () => { setAddphoto(false) };

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setState({
  //     ...state,
  //     [e.target.name]: value
  //   });
  // }
  return (
    <div>
    <button onClick={toggleAddphoto}>add photo</button>
          {showAddphoto?<Modal handleClose={()=>{}} content={<div>Add photo link here</div>}/>:null}
    </div>
  )

}