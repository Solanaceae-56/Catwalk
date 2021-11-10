import React, {useState, useEffect, useRef, useContext} from 'react';
import RelatedCard from './RelatedCard.jsx';
// import relatedItems_id from './sampleData/relatedItems_id.js';
import axios from 'axios';
import {Promise} from "bluebird";
import AppContext from '../../../index.jsx';


const RelatedList = (props) => {

  const darkTheme = useContext(AppContext);

  const [relatedItems, setRelatedItems] = useState([]);
  const [pageProduct, setPageProduct] = useState({});
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    let mount = true;
    axios.get('/products',
        {params: {productId: props.defaultProduct_id, path:'/products/:product_id'}})
        .then((response) => {
          setPageProduct(response);
        })

    axios.get('/products',
        {params: {productId: props.defaultProduct_id, path:'/products/:product_id/related'}})
        .then((results) => {
          if (mount) {
            //res is an array of promises
            const res =[];
            for (var i = 0; i < results.data.length; i ++ ) {
              res.push(axios.get('/products',
              {params: {productId: results.data[i], path:'/products/:product_id'}}));
            }
            return Promise.all(res);
          }

        })
        .then((res) => {
          setRelatedItems(res)
        } );
        return function cleanup () {
          mount = false;
        }


  }, [props.defaultProduct_id])


  const ref = useRef();

  const handleLoad = () => {
    var element = ref.current;
    console.log(element.scrollLeft);
    console.log(element.scrollWidth - element.clientWidth);
    // console.log(element.scrollLeft, element.scrollWidth, element.clientWidth)
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
    (relatedItems!==undefined) &&<div className='related-item'>

      <img className='left-arrow' className={showLeftArrow ? 'active' : 'non-active'} src='https://static.thenounproject.com/png/627785-200.png' width='70' height='70' onClick={() => handleSlide(-100)}/>
       <div className='related-slide' ref={ref} onLoad={handleLoad} >
       {relatedItems.map((relatedItem, i) => <RelatedCard key={i}  value={relatedItem.data.id}  relatedItem={relatedItem} pageProduct={pageProduct} handleCardClick={props.handleCardClick}/>)}</div>
      <img className='right-arrow' className={showRightArrow ? 'active' : 'non-active'} src='https://cdn1.iconfinder.com/data/icons/mixed-17/16/icon_right_rounded-512.png' width='70' height='70' onClick={() => handleSlide(100)}/>
    </div>
  )
}

export default RelatedList;