import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../../../index.jsx';

function Zoomed_In(props) {
  var [current_Image, set_current_Image] = useState('');
  var [imageArr, set_imageArr] = useState([]);
  var [bgPosition, set_bgPosition] = useState('0% 0%');
  var [buttonL, set_buttonL] = useState(<div></div>);
  var [buttonR, set_buttonR] = useState(<div></div>);
  var dark = useContext(AppContext);

  var findIndexOf = function() {
    var result = -1;
    for (var i = 0; i < imageArr.length; ++i) {
      if (imageArr[i].url === current_Image.url) {
        result = i;
      }
    }
    return result;
  }

  var handleLRButton = function(way) {
    var index = findIndexOf();
    if(way === 'left') {
      set_current_Image(imageArr[index - 1]);
      props.changeCurrImg(imageArr[index - 1]);
    } else {
      set_current_Image(imageArr[index+1]);
      props.changeCurrImg(imageArr[index+1]);
    }
  }

  var handleMouseMovement = function(e) {
    const {left, top, width, height} = e.target.getBoundingClientRect();
    var x = (e.pageX - left)/width * 100;
    var y = (e.pageY - top)/height * 100;
    set_bgPosition(x + '%' + ' ' + y + '%');
  }

  var lightDarkClass;
  if (dark) {
    lightDarkClass = 'zoomedNavDark';
  } else {
    lightDarkClass = 'zoomedNavLight';
  }

  useEffect(() => {
    let mounted = true;
    if (mounted && imageArr.length > 0) {
      if (current_Image.url === imageArr[imageArr.length-1].url) {
        set_buttonR(<div></div>);
      } else {
        set_buttonR(<button className={lightDarkClass} id='toTheRightZ' onClick={(e) => handleLRButton('right', e)}> {'>'} </button>);
      }
      if (current_Image.url === imageArr[0].url) {
        set_buttonL(<div></div>);
      } else {
        set_buttonL(<button className={lightDarkClass} id='toTheLeftZ' onClick={(e) => handleLRButton('left', e)}> {'<'} </button>);
      }
    }
    return function cleanup() {
      mounted = false;
    }
  }, [current_Image.url])

  useEffect(() => {
    let mounted = true;
    if (mounted && props.current_Style.photos) {
      set_imageArr(props.current_Style.photos);
      set_current_Image(props.current_Image);
    }

    return function cleanup() {
      mounted = false;
    }
  }, [props.current_Image.url]);

  return (
    <div id='Zoomed'>
      {buttonL}
      <figure id='zoom-effect' onMouseMove={handleMouseMovement}
      style={{
        backgroundImage: 'url(' + current_Image.url + ')',
        backgroundPosition: bgPosition
      }}>
        <img id='zoomed-img' src={current_Image.url}/>
      </figure>
      {buttonR}
      <button class={lightDarkClass} id='exitButton' onClick={(e) => props.changeView(false, e)}>X</button>
    </div>
  );
}

export default Zoomed_In;