import React, { useState, useEffect ,useContext} from 'react';
import AppContext from "../../index.jsx";

export default function ProductBreakdown(props) {
  const [title, setTitle] = useState('');
  const [words, setWords] = useState([]);
  const [value, setValue] = useState(0);
  const darkmode = useContext(AppContext);
  useEffect(() => {
    setTitle(props.title);
    setWords(props.words);
    setValue(props.value);
  }, [props])
  return (
    <div className="productBreakdown" >
      <div className="progressWrapper" style={darkmode?{color:"white"}:{color:"black"}}>
      <div className="label-title">{title}</div>
        <div className="progress-bar">
          <div className="product-bar-pointer" style={{ left: `${(value / 5) * 300 - 150}px` }}>▼</div>
          </div>
        </div>

        <ul className="label-bar">
          <li><span className="charWords">{words[0]}</span></li>
          {/* <li><span className="charWords">{words[1]}</span></li> */}
          <li className="label-bar-end"><span className="charWords">{words[2]}</span></li>
        </ul>
    </div>


  )
}