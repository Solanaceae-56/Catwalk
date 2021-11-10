import React, {useState, useEffect} from 'react';

const Modal = (props) => {
  // console.log('modal', props);
  const tableTitleStyle = {
    fontSize: '25px'
  }


  const tableHeaderStyle = {
    textDecoration: 'underline',
    fontSize: '20px'
  }

  const tableRowStyle = {
    textAlign: 'center'
  }

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

  // return (
  //   <div className='modal-comparison-body'>
  //        <div className='box'>
  //          <div className='comparison-modal-header'>
  //             <p key='modal-header'>
  //               {/* <span className="current-product">{pageProduct}</span> */}
  //               <span className="comparison-modal-title">Comparing</span>
  //               {/* <span className="related-product">{relatedItem}</span> */}
  //             </p>
  //          </div>
  //          <div>
  //            {Object.keys(commonFeatures).map((content, index) => (
  //                <p key={index} className="features-container">
  //                  <span className="current-product">{commonFeatures[content].value1 || '   '}</span>
  //                  <span className="characteristic">{content}</span>
  //                  <span className="related-product">{commonFeatures[content].value2 || '   '}</span>
  //                </p>
  //           ))}
  //          </div>

  //        </div>
  //        <span className="close-icon" onClick={props.handleClose}>x</span>
  //      </div>
  // )<tr><td>{pageProduct}</td>, <td>Comparing</td>, <td>{relatedItem}</td></tr>

  const createTable = () => {
    var table = [];
    var title= [];
    var header = [];
    title.push(<td></td>, <td>Comparing</td>, <td></td>)
    header.push(<td>{pageProduct.name}</td>, <td></td>, <td>{relatedItem.name}</td>);
    table.push(<tr style={tableTitleStyle}>{title}</tr>)
    table.push(<tr style={tableHeaderStyle}>{header}</tr>)
    for (var i = 0; i < Object.keys(commonFeatures).length; i ++) {
        var children = [];
        var feature = Object.keys(commonFeatures)[i];
        children.push(<td>{commonFeatures[feature].value1 || '   '}</td>, <td>{feature}</td>, <td>{commonFeatures[feature].value2 || '   '}</td>);
        table.push(<tr style={tableRowStyle}>{children}</tr>)
    }
    return table;
  }

  return (
    <div className='modal-comparison-body'>
      <div className='modal-box'>
        <div className='modal-table'>{createTable()}</div>

      </div>
      <span className="modal-close-icon" onClick={props.handleClose}>x</span>

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




  // https://www.cluemediator.com/create-simple-popup-in-reactjs


}

export default Modal;