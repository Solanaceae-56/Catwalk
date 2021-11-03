import React, {useState, useEffect} from 'react';
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
          console.log('final product', res);
          setRelatedItems(res)

        } );
        return function cleanup () {
          mount = false;
        }


  }, [props])

  return (
    <div className='related-items-list'>
      {relatedItems.map((relatedItem, i) => <RelatedCard key={i} relatedItem={relatedItem} pageProduct={pageProduct}/>)}
    </div>

  )
}

export default RelatedList;