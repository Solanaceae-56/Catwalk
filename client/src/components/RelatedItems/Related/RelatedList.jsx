import React from 'react';
import sampleData from './sampleData.js';
import RelatedCard from './RelatedCard.jsx';

const RelatedList = (props) => {
  return (
    <div className='related-items-list'>
      {sampleData.map((product, i) => <RelatedCard key={i} />

      )}

    </div>

  )
}

export default RelatedList;