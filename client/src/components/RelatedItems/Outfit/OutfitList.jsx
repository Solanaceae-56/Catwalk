import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';

const OutfitList = (props) => {

  const username = 'dummy';
  // const [pageProduct, setPageProduct] = useState({});
  const [outfitList, setOutfitList] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const addToList = () => {
    axios.post(`/outfit/${username}.${props.defaultProduct_id}`)
    .then((response) => {
      // console.log('post to outfit list', response);
    })

    axios.get(`/outfit/${username}`,)
    .then((response) => {
      // console.log('getting outfit list',response.data);
      setOutfitList(response.data);
    })
  }

  const removeFromList = (e) => {
    axios.delete(`/outfit/${username}.${e.target.id}`)
    .then((response) => {
      // console.log('outfit delete', response);
      setOutfitList(response.data);
    })
  }

  useEffect(() => {
    axios.get(`/outfit/${username}`,)
    .then((response) => {
      // console.log('getting outfit list in use effect',response.data);
      setOutfitList(response.data);
    })
  }, [])

  // console.log('who is first?');

  const ref = useRef();

  const handleLoad = () => {
    var element = ref.current;
    //console.log(element.scrollLeft, element.scrollWidth, element.clientWidth)
    if (element.clientWidth) {
      element.addEventListener('scroll', () => {
        setShowLeftArrow(element.scrollLeft > 0);
        setShowRightArrow(element.scrollLeft < element.scrollWidth - element.clientWidth);
      });
    }
  }

  const handleSlide = (width) => {
    ref.current.scrollLeft += width;
  }


  return (
    <div className='outfit-list'>
      <img className='left-arrow'  className={showLeftArrow ? 'active' : 'non-active'} src='https://static.thenounproject.com/png/627785-200.png' width='70' height='70' onClick={() => handleSlide(-100)}/>
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

         <img className='right-arrow' className={showRightArrow ? 'active' : 'non-active'} src='https://cdn1.iconfinder.com/data/icons/mixed-17/16/icon_right_rounded-512.png' width='70' height='70' onClick={() => handleSlide(100)}/>
    </div>

  )
}


export default OutfitList;