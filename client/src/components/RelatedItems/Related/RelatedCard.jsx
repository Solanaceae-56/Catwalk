import React, {useState, useEffect} from "react";
import axios from 'axios';
// import product_id from './40345_product_id.js'
// import product_style from './sampleData/40344_product_style.js'
// import relatedItems_style from './sampleData/relatedItems_styles.js';
// import RelatedCard_style from './RelatedCard_style.jsx';
import Modal from './Modal.jsx';


const RelatedCard = (props) => {
  // console.log('related card getting props',props);

  const [itemImageUrl, setItemImageUrl] = useState('');
  const [commonFeatures, setCommonFeatures] = useState({});
  // const [isOpen, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    axios.get('http://localhost:3000/products',
    {params: {productId: props.relatedItem.data.id, path:'/products/:product_id/styles'}})
    .then(response => {
      setItemImageUrl(response.data.results[0].photos[0].url);
    })

  }, [])



  return (
    (<div className='related-card'>
        <div><i className='related-card-action'class="far fa-star" onClick={toggleModal} ></i></div>
        {isOpen &&
        <Modal handleClose={toggleModal} relatedItem={props.relatedItem} pageProduct={props.pageProduct} />}
        {itemImageUrl? <img src={itemImageUrl} alt="product default image" width="150" height="200"/> :<img src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png' alt="product default image" width="150" height="200"/> }
        <div className='related-card-category'>{props.relatedItem.data.category}</div>
        <div className='related-card-name'>{props.relatedItem.data.name}</div>
        {/* <div>{itemRating}</div> */}
        {}<div>{itemPrice}</div>
    </div>)
)


}


////////////////////////USE EFFECT and MERGE HOOK///////////////////////////////////////
// const useMergeState = (initialState) => {
//   const [state, setState] = useState(initialState);
//   const setMergedState = (newState) => {
//     setState(prevState => Object.assign({}, prevState, newState));
//   }

//   return [state, setMergedState];

// }

// const RelatedCard = (props) => {

//   const [itemRequest, setItemRequest] = useMergeState({
//     itemCategory: '',
//     itemName: ''
//   });
//   // const [itemCategory, setItemCategory] = useState();
//   // const [itemName, setItemName] = useState();

//   useEffect(() => {
//     axios.get('http://localhost:3000/products',
//     {params: {productId:props.relatedItemId, path:'/products/:product_id'}})
//     .then((results)=> {
//       console.log('how many times');
//       setItemRequest({
//         itemCategory: results.data.category,
//         itemName: results.data.name
//       })
//       // setItemCategory(results.data.category);
//       // setItemName(results.data.name);
//     })

//   })

//   const {itemCategory, itemName} = itemRequest;


//   // const fetchCategoryName =function() {
//   //   axios.get('http://localhost:3000/products',
//   //   {params: {productId:props.relatedItemId, path:'/products/:product_id'}})
//   //   .then((results)=> {
//   //     console.log('how many times');
//   //     setItemCategory(results.data.category);
//   //     setItemName(results.data.name);
//   //   })

//   // }

//   // fetchCategoryName();

//   return (
//     <div className='related-card'>
//         <div>{itemCategory}</div>
//         <div>{itemName}</div>
//     </div>

//   )

// }





export default RelatedCard;





