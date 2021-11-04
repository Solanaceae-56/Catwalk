import React, { useState, useEffect } from 'react';

export default function ProductBreakdown(props) {
    const [title,setTitle] = useState('');
    const [words,setWords] =useState([]);
    const[value, setValue] = useState(0);
    useEffect(()=>{
      setTitle(props.title);
      setWords(props.words);
      setValue(props.value);
    },[props])
    return (
      <div className="productBreakdown">
      <div className="progressWrapper">
        <div className="progress-bar">
          <div className="product-bar-pointer" style={{left:`${(value/5)*320-160}px`}}>▼</div>
          <ul className="label-bar">
            <li><span>{words[0]}</span></li>
            <li><span>{words[1]}</span></li>
            <li><span>{words[2]}</span></li>
          </ul><span className="label-title">{title}</span></div>
      </div>

    </div>
    )
  }