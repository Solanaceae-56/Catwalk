import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Answer from './Answer.jsx';

function AnswersList(props) {
  const [list, setList] = useState(props.data);
  const [renderlist, setRenderList] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  useEffect( () => {
    setList(props.data);
    console.log(list, 'list')
    var list_keys = Object.keys(list);
    console.log(list_keys, 'listkeys');
    for (var i = 0; i < list_keys.length; i++) {
      console.log(list[list_keys[i]]);
      renderlist.push(<Answer item={list[list_keys[i]]} />);
      if (isHidden && renderlist.length === 2) {
        break;
      }
    }
    console.log(renderlist, 'render');
    //onclick toggel ishidden
  }, []);
  if (!list) {
    return (
      <div>
        empty
      </div>
    )
  }
  return(
    <div>
      {renderlist}
    </div>
  )
}

export default AnswersList;