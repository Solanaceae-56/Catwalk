import React, {useState, useEffect} from 'react';
import SideBarList from './SideBarList.jsx';

function Image_Gallery(props) {
  var [current_Image, set_current_Image] = useState('');
  var [imageArr, set_imageArr] = useState([]);
  var [buttonL, set_buttonL] = useState(<div></div>);
  var [buttonR, set_buttonR] = useState(<div></div>);

  var handleImgChange = function(data) {
    set_current_Image(data);
  }

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
    } else {
      set_current_Image(imageArr[index+1]);
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted && imageArr.length > 0) {
      if (current_Image.url === imageArr[imageArr.length-1].url) {
        set_buttonR(<button id='toTheRightFaded'> {'R'} </button>);
      } else {
        set_buttonR(<button id='toTheRight' onClick={(e) => handleLRButton('right', e)}> {'>'} </button>);
      }
      if (current_Image.url === imageArr[0].url) {
        set_buttonL(<button id='toTheLeftFaded'> {'L'} </button>);
      } else {
        set_buttonL(<button id='toTheLeft' onClick={(e) => handleLRButton('left', e)}> {'<'} </button>);
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
      set_current_Image(props.current_Style.photos[0]);
    }

    return function cleanup() {
      mounted = false;
    }
  }, [props.current_Style.style_id]);


  return (
    <div id='image-Gallery-inner'>
      <img id='main-img' src={current_Image.url}/>
      <SideBarList list={imageArr} current={current_Image} handleImgChange={handleImgChange}/>
      {buttonL}
      {buttonR}
    </div>
  );
}

export default Image_Gallery;