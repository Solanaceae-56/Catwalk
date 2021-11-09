import React, {useContext} from 'react';
import AppContext from '../../../index.jsx';

function SideBarEntry(props) {
  var dark = useContext(AppContext);
  var highlight;
  if (props.entry.url === props.current.url) {
    if (dark) {
      highlight = <img className='thumbnailImg_highlighted' src={props.entry.thumbnail_url} onClick={(e) => props.handleImgChange(props.entry, e)}/>
    } else {
      highlight = <img className='thumbnailImg_highlighted_light' src={props.entry.thumbnail_url} onClick={(e) => props.handleImgChange(props.entry, e)}/>
    }

  } else {
    highlight = <img className='thumbnailImg' src={props.entry.thumbnail_url} onClick={(e) => props.handleImgChange(props.entry, e)}/>;
  }

  return (
    highlight
  );
}

export default SideBarEntry;