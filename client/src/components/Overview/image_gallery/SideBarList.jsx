import React, {useState, useEffect, useContext} from 'react';
import SideBarEntry from './SideBarEntry.jsx';
import {InteractionContext} from '../Overview.jsx';
import AppContext from '../../../index.jsx';

function SideBarList(props) {
  var [currFivePhotos, set_currFivePhotos] = useState([]);
  var [upbutton, set_upbutton] = useState(<div></div>);
  var [downbutton, set_downbutton] = useState(<div></div>);
  var interaction = useContext(InteractionContext);
  var dark = useContext(AppContext);

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
      var darkLightClass;
      if (dark) {
        darkLightClass = 'upDownButton-Dark';
      } else {
        darkLightClass = 'upDownButton-Light';
      }
      if (location + 5 >= props.list.length) {
        set_currFivePhotos(props.list.slice(props.list.length-5, props.list.length));
      } else {
        set_currFivePhotos(props.list.slice(location, location + 5))
      }
      if (location === 0) {
        set_downbutton(<button className={darkLightClass} id='downButton' onClick={(e) => {toggleSideBar('down', location, e); interaction.handleClick(e)}}>v</button>);
        set_upbutton(<button className='empty'>^</button>);
      } else if (location + 5 >= props.list.length) {
        set_upbutton(<button className={darkLightClass} id='upButton' onClick={(e) => {toggleSideBar('up', location, e); interaction.handleClick(e)}}>^</button>);
        set_downbutton(<button className='empty'>v</button>);
      } else if (location < props.list.length - 1 && location > 0) {
        set_upbutton(<button className={darkLightClass} id='upButton' onClick={(e) => {toggleSideBar('up', location, e); interaction.handleClick(e)}}>^</button>);
        set_downbutton(<button className={darkLightClass} id='downButton' onClick={(e) => {toggleSideBar('down', location, e); interaction.handleClick(e)}}>v</button>)
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