import React, {useState, useEffect, useRef} from 'react';
import RelatedCard from './RelatedCard.jsx';
// import relatedItems_id from './sampleData/relatedItems_id.js';
import axios from 'axios';
import {Promise} from "bluebird";


const RelatedList = (props) => {


  const [relatedItems, setRelatedItems] = useState([]);
  const [pageProduct, setPageProduct] = useState({});

  //https://stackoverflow.com/questions/52669596/promise-all-with-axios
  useEffect(() => {
    let mount = true;
    axios.get('/products',
        {params: {productId: props.defaultProduct_id, path:'/products/:product_id'}})
        .then((response) => {
          // console.log('pageProduct is', response);
          setPageProduct(response);
        })

    axios.get('/products',
        {params: {productId: props.defaultProduct_id, path:'/products/:product_id/related'}})
        .then((results) => {
          if (mount) {
            // console.log('RC get related items ID', results);
            //res is an array of promises
            const res =[];
            for (var i = 0; i < results.data.length; i ++ ) {
              res.push(axios.get('/products',
              {params: {productId: results.data[i], path:'/products/:product_id'}}));
            }
            // results.data.map((id) => {
            //   console.log('looping through id', id)
            //   return axios.get('http://localhost:3000/products',
            //   {params: {productId: id, path:'/products/:product_id'}}).then((response) => {
            //     console.log('what is response', response.data);
            //     response.data});
            // });
            return Promise.all(res);
          }

        })
        .then((res) => {
          // console.log('related items', res);
          setRelatedItems(res)

        } );
        return function cleanup () {
          mount = false;
        }


  }, [props.defaultProduct_id])


  const ref = useRef();



  const handleSlide = (width) => {
    ref.current.scrollLeft += width;
  }



  return (
    (relatedItems!==undefined) &&<div className='related-item'>

      <img className='left-arrow' src='https://static.thenounproject.com/png/627785-200.png' width='70' height='70' onClick={() => handleSlide(-100)}/>


       <div className='related-slide' ref={ref} >
       {relatedItems.map((relatedItem, i) => <RelatedCard key={i}  value={relatedItem.data.id}  relatedItem={relatedItem} pageProduct={pageProduct} handleCardClick={props.handleCardClick}/>)}</div>



      <img className='right-arrow' src='https://cdn1.iconfinder.com/data/icons/mixed-17/16/icon_right_rounded-512.png' width='70' height='70' onClick={() => handleSlide(100)}/>
    </div>
  )
}

export default RelatedList;