import React, {useState, useEffect} from 'react';
import SideBarEntry from './SideBarEntry.jsx';

function SideBarList(props) {
  var [currSixPhotos, set_currSixPhotos] = useState([]);

  var findIndexOf = function() {
    var result = -1;
    for (var i = 0; i < props.list.length; ++i) {
      if (props.list[i].url === props.current.url) {
        result = i;
      }
    }
    return result;
  }

  useEffect(() => {
    let mounted = true;
    if (mounted && props.list.length > 0) {
      var location = findIndexOf();
      if (location + 6 >= props.list.length) {
        var leftover = 6 - (props.list.length - location);
        var firstpart = props.list.slice(location, props.list.length);
        var lastpart = props.list.slice(0, leftover);
        set_currSixPhotos(firstpart.concat(lastpart));
      } else {
        set_currSixPhotos(props.list.slice(location, location + 6))
      }
    }
    return function cleanup() {
      mounted = false;
    }
  }, [props.current.url])

  return (
    <div id='sideimgBar'>
      {currSixPhotos.map(entry =>
        <SideBarEntry entry={entry} current={props.current} handleImgChange={props.handleImgChange}/>
      )}
    </div>
  )

}

export default SideBarList;