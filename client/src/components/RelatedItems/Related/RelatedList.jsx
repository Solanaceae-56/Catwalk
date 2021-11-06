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
    axios.get('http://localhost:3000/products',
        {params: {productId: props.defaultProduct_id, path:'/products/:product_id'}})
        .then((response) => {
          console.log('pageProduct is', response);
          setPageProduct(response);
        })

    axios.get('http://localhost:3000/products',
        {params: {productId: props.defaultProduct_id, path:'/products/:product_id/related'}})
        .then((results) => {
          if (mount) {
            console.log('RC get related items ID', results);
            //res is an array of promises
            const res =[];
            for (var i = 0; i < results.data.length; i ++ ) {
              res.push(axios.get('http://localhost:3000/products',
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
          console.log('related items', res);
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
    <div className='related-items-list'>

      <img className='left-arrow' src='https://d29fhpw069ctt2.cloudfront.net/icon/image/39092/preview.png' width='15' height='15' onClick={() => handleSlide(-50)}/>

      <div className='related-slide' ref={ref} >
        {relatedItems.map((relatedItem, i) => <RelatedCard key={i}    relatedItem={relatedItem} pageProduct={pageProduct}/>)}
      </div>
      <img className='right-arrow' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58yt5nFfZ0LvP475ccgYb2Rw90dWgHtiYrpyiDRhIxrNot_SjrvnMJwJG9OPs_k-daT4&usqp=CAU' width='15' height='15' onClick={() => handleSlide(50)}/>
    </div>

  )
  }

export default RelatedList;