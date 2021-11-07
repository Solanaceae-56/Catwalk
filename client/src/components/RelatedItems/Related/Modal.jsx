import React, {useState, useEffect} from 'react';

const Modal = (props) => {
  console.log('modal', props);

  const relatedItem = props.relatedItem.data;
  const pageProduct = props.pageProduct.data;

  // const [commonFeatures, setCommonFeatures] = useState({});

  var commonFeatures = {};

  function mergeFeatures () {

    pageProduct.features.forEach(item => {
      commonFeatures[item.feature] = {
        value1: item.value,
        value2: null
      }
    })
    relatedItem.features.forEach(item => {
      if (commonFeatures[item.feature]) {
        commonFeatures[item.feature].value2 = item.value;
      } else {
        commonFeatures[item.feature] = {
          value1: null,
          value2: item.value
        }
      }
    })
  }

  mergeFeatures();

  return (
    <div className='modal-comparison-body'>
         <div className='box'>
           <div className='comparison-modal-header'>
              <p key='modal-header'>
                {/* <span className="current-product">{pageProduct}</span> */}
                <span className="comparison-modal-title">Comparing</span>
                {/* <span className="related-product">{relatedItem}</span> */}
              </p>
           </div>
           <div>
             {Object.keys(commonFeatures).map((content, index) => (
                 <p key={index} className="features-container">
                   <span className="current-product">{commonFeatures[content].value1 || '   '}</span>
                   <span className="characteristic">{content}</span>
                   <span className="related-product">{commonFeatures[content].value2 || '   '}</span>
                 </p>
            ))}
           </div>

         </div>
         <span className="close-icon" onClick={props.handleClose}>x</span>
       </div>
  )



//style

//   let overviewFeatures = pageProduct.features.reduce((obj, user) => {
//     obj[user.feature] = user.value;
//     return obj;
//   }, {});
//   console.log("overview:" , overviewFeatures);

//   // get an array of objects, having all the features as key, and value as value
//   let relatedFeatures = relatedItem.features.reduce((obj, user) => {
//     obj[user.feature] = user.value;
//     return obj;
//   }, {});
//   // console.log('compare:', relatedFeatures);

//   let featureHolder = {};
//   Object.keys(overviewFeatures).forEach(value =>{
//     featureHolder[value] = ''
//   })

//   Object.keys(relatedFeatures).forEach(value =>{
//     featureHolder[value] = ''
//   })

// console.log(featureHolder)

  // const [commonFeatures, setCommonFeatures] = useState({});

  // function mergeFeatures () {
  //   const tempCommonFeatures = {};
  //   pageProduct.features.forEach(item => {
  //     commonFeatures[item.feature] = {
  //       value1: item.value,
  //       value2: null
  //     }
  //   })
  //   relatedItem.features.forEach(item => {
  //     if (commonFeatures[item.feature]) {
  //       commonFeatures[item.feature].value2 = item.value;
  //     } else {
  //       commonFeatures[item.feature] = {
  //         value1: null,
  //         value2: item.value
  //       }
  //     }


  //   })
  //   // console.log('temp common features', tempCommonFeatures);
  //   setCommonFeatures(tempCommonFeatures);

  // }



  // useEffect (()=> {
  //   mergeFeatures();
  //   console.log(commonFeatures)

  // }, [])


  // return (
  //   <div className='comparison-modal'>
  //    <div>
  //    <h1>balabalabalabalalbalablalbalbalbalaaaaaaaaaaaaaa</h1>
  //    {Object.keys(featureHolder).map((content, index) => (
  //    <p key={`key${index+1}`} className="features-container">
  //      {/* <span className="current-product">{overviewFeatures[content].value1 || '    '}</span> */}
  //      <span>{overviewFeatures[content]? overviewFeatures[content] : ' '}</span>
  //      <span className="characteristic">{content}</span>
  //      <span className="related-product">{relatedFeatures[content]? relatedFeatures[content]: ''}</span>
  //    </p>
  //  ))}
  //    </div>
  // </div>

  // )


  // https://www.cluemediator.com/create-simple-popup-in-reactjs


}

export default Modal;