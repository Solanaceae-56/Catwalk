import React, {useState, useEffect} from "react";
import axios from 'axios';
import Modal from './Modal.jsx';
import ReviewStars from '../../RatingsReviews/ReviewStars.jsx';


const RelatedCard = (props) => {

  const [itemImageUrl, setItemImageUrl] = useState('');
  const [commonFeatures, setCommonFeatures] = useState({});
  const [salePrice, setSalePrice] = useState(null);
  const [originalPrice, setOriginalPrice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    let mounted = true;
    axios.get('/products',
    {params: {productId: props.relatedItem.data.id, path:'/products/:product_id/styles'}})
    .then(response => {
      setItemImageUrl(response.data.results[0].photos[0].url);
      setSalePrice(response.data.results[0].sale_price);
      setOriginalPrice(response.data.results[0].original_price);
    })

    axios.get("/reviews/meta", {params: {product_id: props.relatedItem.data.id}})
    .then((data) => {
      var total = 0;
      var votes = 0;
      for (var key in data.data.ratings) {
        total += key * parseInt(data.data.ratings[key], 10);
        votes += parseInt(data.data.ratings[key], 10);
      }
      var average = Math.round(1000*total/votes)/1000;
      setRating((average));
    })
    .catch((err) => {
      setRating(0);
    });

    return function cleanup() {
      mounted = false;
    }


  }, [props.relatedItem.data.id])


  return (
      <div className='related-card' id={props.relatedItem.data.id} >
        <i className='related-card-action'className="fas fa-star" onClick={toggleModal} ></i>
        {isOpen &&
        <Modal handleClose={toggleModal} relatedItem={props.relatedItem} pageProduct={props.pageProduct} style={"z-index:3"}/>}
        {itemImageUrl? <img className='related-img' src={itemImageUrl} alt={props.relatedItem.data.name} id={props.relatedItem.data.id} onClick={props.handleCardClick}/> :<img className='related-img' src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png' alt={props.relatedItem.data.name} id={props.relatedItem.data.id} onClick={props.handleCardClick}/> }
        <div className='related-card-category' id={props.relatedItem.data.id}>{props.relatedItem.data.category}</div>
        <div className='related-card-name' id={props.relatedItem.data.id} >{props.relatedItem.data.name}</div>
        {salePrice? <div className='related-card-sale-price' id={props.relatedItem.data.id}>{salePrice}</div> : <div className='related-card-original-price' id={props.relatedItem.data.id}>{originalPrice}</div> }
        <div className='related-review' id={props.relatedItem.data.id}>
          <ReviewStars id={props.relatedItem.data.id} value={rating}/>
        </div>
    </div>
)
}


export default RelatedCard;





