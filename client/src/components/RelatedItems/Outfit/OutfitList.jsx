import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';

const OutfitList = (props) => {

  const username = 'dummy';
  // const [pageProduct, setPageProduct] = useState({});
  const [outfitList, setOutfitList] = useState([]);

  const addToList = () => {
    axios.post(`/outfit/${username}.${props.defaultProduct_id}`)
    .then((response) => {
      console.log('post to outfit list', response);
    })

    axios.get(`/outfit/${username}`,)
    .then((response) => {
      console.log('getting outfit list',response.data);
      setOutfitList(response.data);
    })
  }

  const removeFromList = (e) => {
    axios.delete(`/outfit/${username}.${e.target.id}`)
    .then((response) => {
      console.log('outfit delete', response);
      setOutfitList(response.data);
    })
  }

  useEffect(() => {
    axios.get(`/outfit/${username}`,)
    .then((response) => {
      console.log('getting outfit list in use effect',response.data);
      setOutfitList(response.data);
    })
  }, [])

  // console.log('who is first?');

  const ref = useRef();



  const handleSlide = (width) => {
    ref.current.scrollLeft += width;
  }


  return (
    <div className='outfit-list'>
      <img className='left-arrow' src='https://d29fhpw069ctt2.cloudfront.net/icon/image/39092/preview.png' width='15' height='15' onClick={() => handleSlide(-100)}/>
      <div className='outfit-slide' ref={ref}>
      <div className='outfit-list-add-outfit'>
        {/* <div className='white-text'>Click</div> */}
        <div className='white-text'>Click</div>
        <img className='outfit-add' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNzhJV3XJfPqf_txRnqYivCCWtJtfQ5o28Bt1NDrKrQhLt5eW8jpnCStBerRmX1JDjPSQ&usqp=CAU' alt="click to add to outfit list"  onClick={addToList}/>
        <div>Add</div>
        <div>to</div>
        <div>Outfit</div>
      </div>
         {outfitList.map((productId, index) =>
           <OutfitCard key={index} productId={productId} removeFromList={removeFromList}/>
         )}

      </div>

         <img className='right-arrow' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58yt5nFfZ0LvP475ccgYb2Rw90dWgHtiYrpyiDRhIxrNot_SjrvnMJwJG9OPs_k-daT4&usqp=CAU' width='15' height='15' onClick={() => handleSlide(100)}/>



    </div>

  )

}


export default OutfitList;