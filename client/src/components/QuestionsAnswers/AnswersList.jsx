import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Answer from './Answer.jsx';

function AnswersList(props) {
  const [list, setList] = useState(props.data);
  const [renderlist, setRenderList] = useState([]);
  const [isHidden, setIsHidden] = useState(true);

  function moreanswers() {
    debugger;
    setIsHidden(false);
  }

  useEffect(() => {
    debugger;
    setList(props.data);
    //console.log(list, 'list')
    var list_keys = Object.keys(list);
    //console.log(list_keys, 'listkeys');
    for (var i = 0; i < list_keys.length; i++) {
      //debugger;
      //console.log(list[list_keys[i]]);
      renderlist.push(<Answer item={list[list_keys[i]]} />);
      if (isHidden && i === 1) {
        break;
      }
    }
    //console.log(renderlist, 'render');
    //onclick toggel ishidden
  }, [isHidden]);


  if (list === []) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (Object.keys(list).length <= 2 || !isHidden) {
    //debugger;
    console.log(renderlist);
    return (
      <div className="answerslist">
        <div>
          {renderlist}
        </div>
      </div>
    );
  } else {
    //debugger;
    return (
      <div className="answerslist">
        <div>
          {renderlist}
        </div>
        <div>
          <button onClick={() => setIsHidden(false)}>More answers</button>
        </div>
      </div>
    )
  }
}


export default AnswersList;