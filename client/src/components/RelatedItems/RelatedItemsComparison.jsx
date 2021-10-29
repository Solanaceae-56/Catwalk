import React from 'react';

class RelatedItemsComparison extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className='related-products'>
                <h5>RELATED PRODUCTS</h5>
                {/* <RelatedList /> */}
                <h5>YOUR OUTFIT</h5>
                {/* <OutfitList />    */}
            </div>
        )
    }
}

export default RelatedItemsComparison;