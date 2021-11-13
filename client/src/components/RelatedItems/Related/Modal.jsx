import React, {useState, useEffect} from 'react';

const Modal = (props) => {
  const tableTitleStyle = {
    fontSize: '25px'
  }


  const tableHeaderStyle = {
    textDecoration: 'underline',
    fontSize: '20px',
  }

  const tableRowStyle = {
    textAlign: 'center'
  }

  const relatedItem = props.relatedItem.data;
  const pageProduct = props.pageProduct.data;


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
        children.push(<td>{commonFeatures[feature].value1 || '-'}</td>, <td>{feature}</td>, <td>{commonFeatures[feature].value2 || '-'}</td>);
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

}

export default Modal;