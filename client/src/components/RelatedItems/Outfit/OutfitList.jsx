import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';
import AppContext from '../../../index.jsx';
import {BsArrowLeftSquare} from 'react-icons/bs';
import {BsArrowRightSquare} from 'react-icons/bs';
import {BsArrowLeftSquareFill} from 'react-icons/bs';
import {BsArrowRightSquareFill} from 'react-icons/bs';

const OutfitList = (props) => {

  const darkTheme = useContext(AppContext);

  const username = 'dummy';
  const [outfitList, setOutfitList] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const addToList = () => {
    axios.post(`/outfit/${username}.${props.defaultProduct_id}`)
    .then((response) => {
    })

    axios.get(`/outfit/${username}`,)
    .then((response) => {
      setOutfitList(response.data);
    })
  }

  const removeFromList = (e) => {
    axios.delete(`/outfit/${username}.${e.target.id}`)
    .then((response) => {
      setOutfitList(response.data);
    })
  }

  useEffect(() => {
    axios.get(`/outfit/${username}`,)
    .then((response) => {
      setOutfitList(response.data);
    })
  }, [])

  const ref = useRef();

  const handleLoad = () => {
    var element = ref.current;
    if (element.clientWidth) {
      element.addEventListener('scroll', () => {
        setShowLeftArrow(element.scrollLeft > 0);
        setShowRightArrow((element.scrollWidth === element.clientWidth) || (element.scrollLeft < element.scrollWidth - element.clientWidth));
      });
    }
  }

  const handleSlide = (width) => {
    ref.current.scrollLeft += width;
  }


  return (
    <div className='outfit-list'>
      {darkTheme? <BsArrowLeftSquare className='left-arrow' className={showLeftArrow ? 'active' : 'non-active'} size={64} onClick={() => handleSlide(-100)}/> : <BsArrowLeftSquareFill className='left-arrow' className={showLeftArrow ? 'active' : 'non-active'} size={64} style={{ color: '#a6a6a6' }} onClick={() => handleSlide(-100)}/>}
      <div className='outfit-slide' ref={ref} onLoad={handleLoad}>
        <div className='outfit-list-add-outfit'>
          <img className='outfit-add' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNzhJV3XJfPqf_txRnqYivCCWtJtfQ5o28Bt1NDrKrQhLt5eW8jpnCStBerRmX1JDjPSQ&  usqp=CAU' alt="click to add to outfit list"  onClick={addToList}/>
          <h1>Add to Outfit</h1>
          <h4 className='white-text'>click</h4>
          <h5 className='white-text'>here</h5>
        </div>
          {outfitList.map((productId, index) =>
             <OutfitCard key={index} productId={productId} removeFromList={removeFromList}/>
           )}

      </div>

      {darkTheme? <BsArrowRightSquare className='right-arrow' className={showRightArrow ? 'active' : 'non-active'} size={64} onClick={() => handleSlide(100)}/> : < BsArrowRightSquareFill className='right-arrow' className={showRightArrow ? 'active' : 'non-active'} size={64} style={{ color: '#a6a6a6' }}  onClick={() => handleSlide(100)}/>}
    </div>

  )
}


export default OutfitList;