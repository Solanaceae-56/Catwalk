import React, {useState, useEffect} from 'react';
import SideBarEntry from './SideBarEntry.jsx';

function SideBarList(props) {
  var [currFivePhotos, set_currFivePhotos] = useState([]);
  var [upbutton, set_upbutton] = useState(<div></div>);
  var [downbutton, set_downbutton] = useState(<div></div>);

  var findIndexOf = function() {
    var result = -1;
    for (var i = 0; i < props.list.length; ++i) {
      if (props.list[i].url === props.current.url) {
        result = i;
      }
    }
    return result;
  }

  var toggleSideBar = function(upOrDown, location) {
    if (upOrDown === 'up') {
      set_currFivePhotos(props.list.slice(location-1, location+4));
      props.handleImgChange(props.list[location-1]);
    } else {
      if (location + 5 >= props.list.length) {
        set_currFivePhotos(props.list.slice(location+1, props.list.length - 1));
      } else {
        set_currFivePhotos(props.list.slice(location+1, location+5));
      }
      props.handleImgChange(props.list[location+1]);
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted && props.list.length > 0) {
      var location = findIndexOf();
      if (location + 5 >= props.list.length) {
        set_currFivePhotos(props.list.slice(location, props.list.length));
      } else {
        set_currFivePhotos(props.list.slice(location, location + 5))
      }
      if (location === 0) {
        set_downbutton(<button className='upDownButton' id='downButton' onClick={(e) => toggleSideBar('down', location, e)}>↓</button>);
        set_upbutton(<div></div>);
      } else if (location === props.list.length - 1) {
        set_upbutton(<button className='upDownButton' id='upButton' onClick={(e) => toggleSideBar('up', location, e)}>↑</button>);
        set_downbutton(<div></div>);
      } else if (location < props.list.length - 1 && location > 0) {
        set_upbutton(<button className='upDownButton' id='upButton' onClick={(e) => toggleSideBar('up', location, e)}>↑</button>);
        set_downbutton(<button className='upDownButton' id='downButton' onClick={(e) => toggleSideBar('down', location, e)}>↓</button>)
      }
    }
    return function cleanup() {
      mounted = false;
    }
  }, [props.current.url])

  return (
    <div id='sideimgBar'>
      {upbutton}
      {currFivePhotos.map((entry, i) =>
        <SideBarEntry key={i} entry={entry} current={props.current} handleImgChange={props.handleImgChange}/>
      )}
      {downbutton}
    </div>
  )
}

export default SideBarList;