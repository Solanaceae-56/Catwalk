import React, {useState, useEffect} from "react";
import axios from 'axios';
import Modal from './Modal.jsx';


const RelatedCard = (props) => {

  const [itemImageUrl, setItemImageUrl] = useState('');
  const [commonFeatures, setCommonFeatures] = useState({});
  const [salePrice, setSalePrice] = useState(null);
  const [originalPrice, setOriginalPrice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    axios.get('http://localhost:3000/products',
    {params: {productId: props.relatedItem.data.id, path:'/products/:product_id/styles'}})
    .then(response => {
      setItemImageUrl(response.data.results[0].photos[0].url);
      setSalePrice(response.data.results[0].sale_price);
      setOriginalPrice(response.data.results[0].original_price);
    })

  }, [])


  return (
      <div className='related-card'>
        <div><i className='related-card-action'className="far fa-star" onClick={toggleModal} ></i></div>
        {isOpen &&
        <Modal handleClose={toggleModal} relatedItem={props.relatedItem} pageProduct={props.pageProduct} />}
        {itemImageUrl? <img src={itemImageUrl} alt="product default image" width="150" height="200"/> :<img src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png' alt="product default image" width="150" height="200"/> }
        <div className='related-card-category'>{props.relatedItem.data.category}</div>
        <div className='related-card-name'>{props.relatedItem.data.name}</div>
        {/* <div>{itemRating}</div> */}
        {salePrice? <div className='related-card-sale-price'>{salePrice}</div> : <div className='related-card-original-price'>{originalPrice}</div> }
    </div>
)
}


export default RelatedCard;





