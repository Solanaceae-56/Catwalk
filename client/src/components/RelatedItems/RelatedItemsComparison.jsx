import React, {useState, useEffect} from 'react';
import RelatedList from './Related/RelatedList.jsx';
import OutfitList from './Outfit/OutfitList.jsx';
import axios from 'axios';


const RelatedItemsComparison = (props) => {
    const [defaultProduct_id, setDefaultId] = useState();
    useEffect(() => {
        setDefaultId(props.product_id);
    },[props.product_id])

    const trackInteraction = (e) => {
        let obj = {
            element: e.target.className,
            widget: 'Related Items & Comparison',
            time: Date()
        }
        axios.post('/interactions', obj)
        .then((res) => {})
        .catch((err) => {
        })
    }

    if (defaultProduct_id) {
        return (
            <div className='related-products' onClick={trackInteraction}>
                    <h1>Related Products</h1>
                    <RelatedList   defaultProduct_id={defaultProduct_id} handleCardClick={props.handleCardClick}/>
                    <h1>Your Outfit</h1>
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

