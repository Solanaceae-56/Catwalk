import React, {useState, useEffect} from 'react';
import RelatedList from './Related/RelatedList.jsx';
import OutfitList from './Outfit/OutfitList.jsx';
import axios from 'axios';
// import relatedItemsId from './relatedItemsId.js';

const RelatedItemsComparison = (props) => {

    var defaultProduct_id = 40348;

    return (
        <div className='related-products'>
                <h5>RELATED PRODUCTS</h5>
                <RelatedList   defaultProduct_id={defaultProduct_id}/>
                <h5>YOUR OUTFIT</h5>
                <OutfitList defaultProduct_id={defaultProduct_id}/>
        </div>

    )
}

export default RelatedItemsComparison;


