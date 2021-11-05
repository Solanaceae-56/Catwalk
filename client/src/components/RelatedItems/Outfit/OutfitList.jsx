import React, {useState, useEffect} from 'react';
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

  return (
    <div className='outfit-list'>
      <div className='outfit-list-add-outfit'>
        <div className='white-text'>Click</div>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNzhJV3XJfPqf_txRnqYivCCWtJtfQ5o28Bt1NDrKrQhLt5eW8jpnCStBerRmX1JDjPSQ&usqp=CAU' alt="click to add to outfit list" width="150" height="200" onClick={addToList}/>
        <div>Add</div>
        <div>to</div>
        <div>Outfit</div>
      </div>
         {outfitList.map((productId, index) =>
           <OutfitCard key={index} productId={productId} removeFromList={removeFromList}/>
         )}



    </div>

  )

}


export default OutfitList;