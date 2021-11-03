import React, {useState, useEffect} from 'react';

const Modal = (props) => {
  // console.log('Modal',props);
  const relatedItem = props.relatedItem.data;
  const pageProduct = props.pageProduct.data;
  // console.log('modal related item', relatedItem);
  // console.log('modal page product', pageProduct);

  const [commonFeatures, setCommonFeatures] = useState({});
  const [window, setWindow] = useState('none');

  function handleClick () {
    alert('haha');
  }

  function mergeFeatures () {
    const tempCommonFeatures = {};
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
    // console.log('temp common features', tempCommonFeatures);
    setCommonFeatures(tempCommonFeatures);

  }

  function toggleModalWindow () {
    if (window === 'none') {
      document.body.style.overflow = 'hidden';
      setWindow('block');
    } else {
      document.body.style.overflow = 'scroll';
      setWindow('none');
    }
  }

  useEffect(() => {
    mergeFeatures();
    toggleModalWindow();
  }, [props]);

  // console.log('common features', commonFeatures);

  return (
    <div className='modal'>
       <i className='related-card-action'class="far fa-star" onClick={handleClick}></i>
    </div>
  )

}

export default Modal;