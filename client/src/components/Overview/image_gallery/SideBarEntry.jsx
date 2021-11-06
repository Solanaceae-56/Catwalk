import React from 'react';

function SideBarEntry(props) {
  var highlight;
  if (props.entry.url === props.current.url) {
    highlight = <img className='thumbnailImg_highlighted' src={props.entry.thumbnail_url} onClick={(e) => props.handleImgChange(props.entry, e)}/>
  } else {
    highlight = <img className='thumbnailImg' src={props.entry.thumbnail_url} onClick={(e) => props.handleImgChange(props.entry, e)}/>;
  }

  return (
    highlight
  );
}

export default SideBarEntry;