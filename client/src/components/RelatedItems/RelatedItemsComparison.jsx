import React, {useState, useEffect} from 'react';
import RelatedList from './Related/RelatedList.jsx';
import OutfitList from './Outfit/OutfitList.jsx';
import axios from 'axios';
// import relatedItemsId from './relatedItemsId.js';

const RelatedItemsComparison = (props) => {
    const [defaultProduct_id, setDefaultId] = useState();
    useEffect(() => {
        setDefaultId(props.product_id);
    },[props.product_id])


    if (defaultProduct_id) {
        return (
            <div className='related-products'>
                    <h5>RELATED PRODUCTS</h5>
                    <RelatedList   defaultProduct_id={defaultProduct_id} handleCardClick={props.handleCardClick}/>
                    <h5>YOUR OUTFIT</h5>
                    <OutfitList defaultProduct_id={defaultProduct_id}/>
            </div>

        )

    } else {
        return (
            <div>Loading</div>
        )
    }

}

export default RelatedItemsComparison;

