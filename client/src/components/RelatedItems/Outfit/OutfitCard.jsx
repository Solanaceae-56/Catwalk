import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewStars from '../../RatingsReviews/ReviewStars.jsx';

const OutfitCard = (props) => {

  const [itemImageUrl, setItemImageUrl] = useState('');
  const [salePrice, setSalePrice] = useState(null);
  const [originalPrice, setOriginalPrice] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);


  useEffect(() => {
    axios.get('http://localhost:3000/products',
    {params: {productId: props.productId, path:'/products/:product_id/styles'}})
    .then(response => {
      setItemImageUrl(response.data.results[0].photos[0].url);
      setSalePrice(response.data.results[0].sale_price);
      setOriginalPrice(response.data.results[0].original_price);
    })

    axios.get('http://localhost:3000/products',
    {params: {productId: props.productId, path:'/products/:product_id'}})
    .then(response => {
      setName(response.data.name);
      setCategory(response.data.category);

    })

    axios.get("http://localhost:3000/reviews/meta", {params: {product_id: props.productId}})
    .then((data) => {
      var total = 0;
      var votes = 0;
      for (var key = 1; key <= 5; key++) {
        total += key * parseInt(data.data.ratings[key], 10);
        votes += parseInt(data.data.ratings[key], 10);
      }
      var average = Math.round(1000*total/votes)/1000;
      setRating((average/5 * 100) + "%");
    })
    .catch((err) => {
      setRating(0);
    });

  }, [])


  return (
    (<div className='outfit-card'>
        <div><i className="far fa-times-circle" id={props.productId} onClick={props.removeFromList}></i></div>
        {itemImageUrl? <img src={itemImageUrl} alt="product default image" width="150" height="200"/> :<img src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png' alt="product default image" width="150" height="200"/> }
        <div className='outfit-card-category'>{category}</div>
        <div className='outfit-card-name'>{name}</div>
        <div className='outfit-review'>
          <ReviewStars value={rating}/>
        </div>
        {salePrice? <div className='outfit-card-sale-price'>{salePrice}</div> : <div className='outfit-card-original-price'>{originalPrice}</div> }
    </div>)
)


}


export default OutfitCard;