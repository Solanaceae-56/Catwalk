import React, {useState, useEffect} from 'react';
import RelatedList from './Related/RelatedList.jsx';
import axios from 'axios';
// import relatedItemsId from './relatedItemsId.js';

const RelatedItemsComparison = (props) => {

    var defaultProduct_id = 40344;

    // const [pageProduct, setPageProduct] = useState({});



    // useEffect(() => {
    //     console.log('is this working?');
    //     axios.get('http://localhost:3000/products',
    //     {params: {productId: 40344, path:'/products/:product_id'}})
    //     .then((response) => {
    //         console.log('page product', response);
    //         setPageProduct(response);

    //     });
    // }, [props]);



    // const [relatedItemsId, setRelatedItemsId] = useState([]);


    // const fetchRelatedIds = function () {
    //     axios.get('http://localhost:3000/products',
    //     {params: {productId: 40344, path:'/products/:product_id/related'}})
    //     .then((results) => {
    //         console.log('RC get related items ID', results.data);
    //         setRelatedItemsId(results.data)
    //         console.log('relatedItemsID lalala', relatedItemsId);

    //     })
    // }

    // fetchRelatedIds();

    // useEffect(() => {
        // axios.get('http://localhost:3000/products',
        // {params: {productId: 40344, path:'/products/:product_id/related'}})
        // .then((results) => {
        //     console.log('RC get related items ID');
        //     setRelatedItemsId(results.data)
        //     // console.log(relatedItemsId);

        // })

        // setRelatedItemsId(relatedItemsId);

    // })

    return (
        <div className='related-products'>
                <h5>RELATED PRODUCTS</h5>
                <RelatedList   defaultProduct_id={defaultProduct_id}/>
                <h5>YOUR OUTFIT</h5>
                {/* <OutfitList />    */}
        </div>

    )
}

export default RelatedItemsComparison;


